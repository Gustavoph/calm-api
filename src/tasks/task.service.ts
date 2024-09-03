import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

import { Task } from "@/tasks/task";
import { CreateTaskDto } from "@/tasks/dtos/create.dto";
import { Tag } from "@/tags/tag";
import { User } from "@/users/user";

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) { }

  async getById(id: string) {
    const task = await this.taskRepository.findOne({ where: { id }, relations: ['tags'], })
    if (!task) {
      throw new NotFoundException("Task not found")
    }
    return task
  }

  async list(userId: string) {
    return await this.taskRepository.find({
      where: { owner: { id: userId } }, relations: ['tags'],
    })
  }

  async create(userId: string, dto: CreateTaskDto) {
    const task = plainToClass(Task, dto)
    const owner = new User()
    owner.id = userId;
    task.owner = owner

    if (dto.tags && dto.tags.length >= 1) {
      for (const tagId of dto.tags) {
        const tag = new Tag()
        tag.id = tagId
        task.tags.push(tag)
      }
    }

    const taskCreated = this.taskRepository.create(task)
    await this.taskRepository.save(taskCreated)
  }

  async update(id: string, dto: CreateTaskDto) {
    const taskStorage = await this.getById(id)
    const task = plainToClass(Task, {
      ...taskStorage,
      ...dto
    })

    if (dto.tags && dto.tags.length >= 1) {
      for (const tagId of dto.tags) {
        const tag = new Tag()
        tag.id = tagId
        task.tags.push(tag)
      }
    }

    await this.taskRepository.save(task)
  }

  async delete(id: string) {
    await this.getById(id)
    await this.taskRepository.delete(id)
  }
}