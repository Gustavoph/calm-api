import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { CreateUserDto } from '@/users/dtos/create.dto'
import { UserService } from '@/users/user.service'
import { UpdateUserDto } from '@/users/dtos/update.dto'
import { Public } from '@/auth/auth.guard'
import { User } from '@/auth/user.decorator'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getById(@User() userId: string) {
    return this.userService.getById(userId)
  }

  @Public()
  @Post()
  async create(@Body() dto: CreateUserDto) {
    await this.userService.create(dto)
  }

  @Put()
  async update(@User() userId: string, @Body() dto: UpdateUserDto) {
    this.userService.update(userId, dto)
  }

  @Delete()
  async delete(@User() userId: string) {
    this.userService.delete(userId)
  }
}
