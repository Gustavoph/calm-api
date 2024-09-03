import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}
