import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { CreateUserDto } from '@/users/dtos/create.dto'
import { UpdateUserDto } from '@/users/dtos/update.dto'
import { User } from '@/users/user'

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async getById(id: string) {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) throw new NotFoundException('User not found')
    delete user.password
    return user
  }

  async create(dto: CreateUserDto) {
    await this.verifyUserAlreadyExists(dto.email)
    const user = plainToInstance(User, dto)
    const hashedPassword = await bcrypt.hash(user.password, 8)
    user.password = hashedPassword
    const userCreated = this.userRepository.create(user)
    await this.userRepository.save(userCreated)
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.getById(id)
    const updated = plainToInstance(User, Object.assign(user, dto))
    if (dto.email && dto.email !== user.email)
      this.verifyUserAlreadyExists(dto.email)
    await this.userRepository.save(updated)
  }

  async delete(id: string) {
    await this.getById(id)
    await this.userRepository.delete(id)
  }

  async verifyUserAlreadyExists(email: string) {
    const existingUser = await this.userRepository.findOneBy({ email })
    if (existingUser) {
      throw new ConflictException('Email already in use')
    }
  }
}
