import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { ILike } from 'typeorm';

import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { SharedNoteRepository } from './shared-note.repositary';
import { NoteRepository } from './note.repository';
import { CreateSharedNoteDto } from './dto/create-shared-note.dto';

@Injectable()
export class NoteService {
  constructor(
    @InjectRepository(NoteRepository)
    private noteRepository: NoteRepository,
    private usersService: UsersService,
    private sharedNoteRepository: SharedNoteRepository,
  ) {}

  async myNotes(id: string) {
    return await this.noteRepository.find({
      where: { user: id },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async create(id: string, createNoteDto: CreateNoteDto) {
    const user = await this.usersService.findOne(id);
    return await this.noteRepository.createNote(user, createNoteDto);
  }

  async findOne(id: string) {
    return await this.noteRepository.findOne({ where: { id: id } });
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const existingTask = await this.noteRepository.findOne({
      where: { id: id },
    });

    if (!existingTask) {
      throw new NotFoundException(
        `Note with Id:${id} is not found in the database`,
      );
    }

    await this.noteRepository.update({ id }, updateNoteDto);
    return await this.noteRepository.findOne({ id });
  }

  async remove(id: string) {
    const existingNote = await this.noteRepository.findOne({
      where: { id },
    });
    if (!existingNote) {
      throw new NotFoundException(
        `Note with Id:${id} is not found in the database`,
      );
    }
    const result = await this.noteRepository.delete(id);
    if (result.affected) return { deleted: true };

    return { deleted: false };
  }

  async findByNote(note) {
    return await this.noteRepository.find({
      where: [{ note: ILike(`%${note}%`) }, { title: ILike(`%${note}%`) }],
    });
  }

  // Notes Sharing

  async createSharedNote(
    creatorUserId: any,
    createSharedNoteDto: CreateSharedNoteDto,
  ) {
    const sharedNoteExists = await this.sharedNoteRepository.find({
      where: { creatorUser: creatorUserId },
    });

    if (sharedNoteExists) {
      await this.sharedNoteRepository.delete({ creatorUser: creatorUserId });
    }

    const creatorUser = await this.usersService.findOne(creatorUserId);
    const note = await this.noteRepository.findOne({
      where: { id: createSharedNoteDto.noteId },
    });

    await createSharedNoteDto.sharedUserIds.forEach(
      async (sharedUserId: string) => {
        const sharedUser = await this.usersService.findOne(sharedUserId);

        if (sharedUser)
          await this.sharedNoteRepository.createSharedNote(
            creatorUser,
            sharedUser,
            note,
          );
      },
    );

    return { shareStatus: 'Shared notes with other users.' };
  }

  async getNotesSharedWithMe(sharedUserId: string) {
    return await this.sharedNoteRepository.find({
      where: { sharedUser: sharedUserId },
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
