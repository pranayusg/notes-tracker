import { User } from 'src/users/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { SharedNote } from './entities/shared-note.entity';
import { Note } from './entities/note.entity';

@EntityRepository(SharedNote)
export class SharedNoteRepository extends Repository<SharedNote> {
  async createSharedNote(
    creatorUser: User,
    sharedUser: User,
    note: Note,
  ): Promise<SharedNote> {
    const newSharedNote = this.create({ creatorUser, sharedUser, note });
    await this.save(newSharedNote);
    return newSharedNote;
  }
}
