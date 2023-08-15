import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateSharedNoteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  sharedUserIds: string[];

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  noteId: string;
}
