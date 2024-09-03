import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

import { TaskService } from "@/tasks/task.service";
import { User } from "@/auth/user.decorator";
import { CreateTaskDto } from "@/tasks/dtos/create.dto";
import { updateTaskDto } from "@/tasks/dtos/update.dto";

@Controller("tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  async list(@User() userId: string) {
    return await this.taskService.list(userId)
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    return await this.taskService.getById(id)
  }

  @Post()
  async create(@User() userId: string, @Body() dto: CreateTaskDto) {
    await this.taskService.create(userId, dto)
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: updateTaskDto) {
    await this.taskService.update(id, dto)
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    await this.taskService.delete(id)
  }
}