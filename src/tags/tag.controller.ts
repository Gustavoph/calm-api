import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";

import { TagService } from "@/tags/tags.service";
import { User } from "@/auth/user.decorator";
import { CreateTagDto } from "@/tags/dtos/create.dto";
import { UpdateTagDto } from "@/tags/dtos/update.dto";

@Controller("tags")
export class TagController {
  constructor(private readonly tagService: TagService) { }

  @Get()
  async list(@User() userId: string) {
    return await this.tagService.list(userId)
  }

  @Get(":id")
  async getById(@Param("id") id: string) {
    return await this.tagService.getById(id)
  }

  @Post()
  async create(@User() userId: string, @Body() dto: CreateTagDto) {
    await this.tagService.create(userId, dto)
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() dto: UpdateTagDto) {
    await this.tagService.update(id, dto)
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    await this.tagService.delete(id)
  }
}