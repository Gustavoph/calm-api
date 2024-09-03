import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { User } from '@/users/user'
import { Task } from '@/tasks/task'
import { Tag } from '@/tags/tag'

import { appConfigSchema, AppConfig } from '@/shared/configs'
import { AuthModule } from '@/auth/auth.module'
import { UserModule } from '@/users/user.module'
import { TagModule } from '@/tags/tag.module'
import { TaskModule } from '@/tasks/task.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService<AppConfig>],
      useFactory: (config: ConfigService<AppConfig>) => {
        return {
          type: 'postgres',
          host: config.get('DB_HOST'),
          port: config.get('DB_PORT'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_DATABASE'),
          entities: [User, Task, Tag],
          synchronize: true,
        }
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (env) => appConfigSchema.parse(env),
    }),
    AuthModule,
    UserModule,
    TagModule,
    TaskModule
  ],
})
export class AppModule { }
