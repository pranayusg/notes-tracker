import { Note } from 'src/note/entities/note.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('sharedNote')
export class SharedNote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn()
  creatorUser: User;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn()
  sharedUser: User;

  @ManyToOne(() => Note, { eager: true, cascade: true })
  @JoinColumn()
  note: Note;
}
