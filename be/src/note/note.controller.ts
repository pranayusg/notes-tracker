import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  AuthorQuery,
  NoteQuery,
  TagQuery,
  TagsQuery,
} from './query/queryParams';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/users/get-user.decorator';
import { CreateSharedNoteDto } from './dto/create-shared-note.dto';

@ApiTags('Note')
@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get('/mynotes')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async myNotes(@GetUser() user) {
    return await this.noteService.myNotes(user.id);
  }

  @ApiCreatedResponse({ description: 'Success' })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong on server',
  })
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@GetUser() user, @Body() createNoteDto: CreateNoteDto) {
    return await this.noteService.create(user.id, createNoteDto);
  }

  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.noteService.findOne(id);
  }

  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateNoteDto: CreateNoteDto) {
    return this.noteService.update(id, updateNoteDto);
  }

  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.noteService.remove(id);
  }

  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  @Get('/search/note')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findByNote(@Query('note') note: NoteQuery) {
    return this.noteService.findByNote(note);
  }

  @ApiCreatedResponse({ description: 'Success' })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong on server',
  })
  @Post('/shared/note')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createSharedNote(
    @GetUser() user,
    @Body() createSharedNoteDto: CreateSharedNoteDto,
  ) {
    return await this.noteService.createSharedNote(
      user.id,
      createSharedNoteDto,
    );
  }

  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  @Get('/shared/note')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findNotesSharedWithMe(@GetUser() user) {
    return this.noteService.getNotesSharedWithMe(user.id);
  }

  @ApiOkResponse({ description: 'Success' })
  @ApiNotFoundResponse({ description: 'Note not found' })
  @Get('/shared/note/users')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findSharedUsers(@Query('noteId') noteId: string, @GetUser() user) {
    return this.noteService.getSharedUers(user.id, noteId);
  }
}
