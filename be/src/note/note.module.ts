import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteRepository } from './note.repository';
import { UsersModule } from 'src/users/users.module';
import { SharedNoteRepository } from './shared-note.repositary';

@Module({
  imports: [
    TypeOrmModule.forFeature([NoteRepository, SharedNoteRepository]),
    UsersModule,
  ],
  controllers: [NoteController],
  providers: [NoteService],
  exports: [NoteService],
})
export class NoteModule {}
