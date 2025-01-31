import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UpdateUserDto {
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
