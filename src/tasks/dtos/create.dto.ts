import { IsNotEmpty } from "class-validator"

export class CreateTaskDto {
  @IsNotEmpty()
  title: string

  description: string

  deadline: Date

  tags: string[]
}