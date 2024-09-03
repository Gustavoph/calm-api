import { Task } from 'src/tasks/task'
import { User } from 'src/users/user'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.tags)
  owner: User

  @ManyToMany(() => Task, (task) => task.tags)
  tasks: Task[]
}
