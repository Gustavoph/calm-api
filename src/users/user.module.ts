import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from "@/users/user.controller";
import { UserService } from "@/users/user.service";
import { User } from "@/users/user";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService]
})
export class UserModule { }