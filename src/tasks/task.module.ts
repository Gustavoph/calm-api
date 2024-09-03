import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Task } from "@/tasks/task";
import { TaskController } from "@/tasks/task.controller";
import { TaskService } from "@/tasks/task.service";

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService]
})
export class TaskModule { }