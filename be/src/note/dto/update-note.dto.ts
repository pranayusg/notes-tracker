import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateNoteDto } from './create-note.dto';
import { IsInt } from 'class-validator';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {}
