import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { Tag } from "@/tags/tag";
import { User } from "@/users/user";
import { CreateTagDto } from "@/tags/dtos/create.dto";
import { UpdateTagDto } from "@/tags/dtos/update.dto";

@Injectable()
export class TagService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) { }

  async list(userId: string) {
    return await this.tagRepository.findBy({ owner: { id: userId } })
  }

  async getById(id: string) {
    const tag = await this.tagRepository.findOneBy({ id })
    if (!tag) {
      throw new NotFoundException("Tag not found")
    }
    return tag
  }

  async create(userId: string, dto: CreateTagDto) {
    await this.checkNameAlreadyExists(userId, dto.name)

    const tag = plainToClass(Tag, dto)
    const user = new User();
    user.id = userId
    tag.owner = user

    const tagCreated = this.tagRepository.create(tag)
    await this.tagRepository.save(tagCreated)
  }

  async update(id: string, dto: UpdateTagDto) {
    const tag = await this.tagRepository.findOne({ where: { id }, relations: ['owner'], })
    if (!tag) {
      throw new NotFoundException("Tag not found")
    }

    if (tag.name !== dto.name) {
      await this.checkNameAlreadyExists(tag.owner.id, dto.name)
    }

    tag.name = dto.name
    await this.tagRepository.save(tag)
  }

  async delete(id: string) {
    await this.getById(id)
    await this.tagRepository.delete(id)
  }

  async checkNameAlreadyExists(userId: string, name: string) {
    const nameAlreadyExists = await this.tagRepository.findOneBy({
      name, owner: { id: userId }
    })
    if (nameAlreadyExists) {
      throw new ConflictException("Name already in use")
    }
  }
}