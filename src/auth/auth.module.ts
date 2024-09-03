import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";

import { User } from "@/users/user";
import { AuthController } from "@/auth/auth.controller";
import { AuthService } from "@/auth/auth.service";
import { jwtConstants } from "@/auth/auth.constants";
import { AuthGuard } from "@/auth/auth.guard";

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30d' },
    }),
    TypeOrmModule.forFeature([User]),

  ],
  controllers: [AuthController],
  providers: [AuthService, {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },],
  exports: [AuthService]
})
export class AuthModule { }