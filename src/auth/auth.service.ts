import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";

import { User } from "@/users/user";
import { LoginDto } from "@/auth/dtos/login.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOneBy({ email: dto.email })
    if (!user) {
      throw new UnauthorizedException()
    }

    const isCorrectPassword = await bcrypt.compare(dto.password, user.password)
    if (!isCorrectPassword) {
      throw new UnauthorizedException()
    }

    const accessToken = this.jwtService.sign({ sub: user.id })
    return { accessToken }
  }
}