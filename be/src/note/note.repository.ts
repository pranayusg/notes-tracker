import { EntityRepository, Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { getRepository, getManager } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@EntityRepository(Note)
export class NoteRepository extends Repository<Note> {
  async createNote(user: User, createNoteDto: CreateNoteDto): Promise<Note> {
    const newNote = this.create({ ...createNoteDto, user });
    await this.save(newNote);
    return newNote;
  }
}
