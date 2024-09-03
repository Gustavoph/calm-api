import { Tag } from 'src/tags/tag'
import { User } from 'src/users/user'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  isDone: boolean

  @Column({ nullable: true })
  deadline: Date

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => User, (user) => user.tasks)
  owner: User

  @ManyToMany(() => Tag, (tag) => tag.tasks)
  @JoinTable()
  tags: Tag[]
}
