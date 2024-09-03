import { Tag } from 'src/tags/tag'
import { Task } from 'src/tasks/task'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToMany(() => Task, (task) => task.owner)
  tasks: Task[]

  @OneToMany(() => Tag, (tag) => tag.owner)
  tags: Tag[]
}
