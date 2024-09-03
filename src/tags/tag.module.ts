import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TagController } from "@/tags/tag.controller";
import { TagService } from "@/tags/tags.service";
import { Tag } from "@/tags/tag";

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService]
})
export class TagModule { }