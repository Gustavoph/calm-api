import { IsString } from "class-validator"

export class updateTaskDto {
  @IsString()
  title: string

  description: string

  deadline: Date

  tags: string[]
}