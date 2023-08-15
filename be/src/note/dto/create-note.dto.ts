import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateNoteDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  text: string;

  // @ApiProperty({ description: 'Background color for note' })
  @IsString()
  // @IsNotEmpty()
  @IsOptional()
  @MinLength(2)
  color: string;
}
