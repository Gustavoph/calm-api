import { Body, Controller, Post } from "@nestjs/common";

import { AuthService } from "@/auth/auth.service";
import { LoginDto } from "@/auth/dtos/login.dto";
import { Public } from "@/auth/auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post("login")
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }
}