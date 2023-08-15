import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column({
    default: 'white',
  })
  color: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;
}
