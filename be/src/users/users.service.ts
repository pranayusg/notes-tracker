import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users.repositary';

@Injectable()
export class UsersService {
  private saltOrRounds = 10;
  constructor(
    @InjectRepository(UserRepository)
    private repository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      this.saltOrRounds,
    );
    return await this.repository.createUser(createUserDto);
  }

  async findAll(id: string) {
    const allUsers = await this.repository.find();

    const otherUsers = allUsers.filter(function (user) {
      return user.id !== id;
    });

    const users = [];
    otherUsers.forEach((user) => {
      users.push({ id: user.id, username: user.userName });
    });
    return users;
  }

  async findOne(id: string) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async readEmail(email: string) {
    return await this.repository.findOne({ where: { email: email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.repository.findOne({
      where: { id: id },
    });

    if (!existingUser) {
      throw new NotFoundException(
        `Note with Id:${id} is not found in the database`,
      );
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        this.saltOrRounds,
      );
    }
    await this.repository.update({ id }, updateUserDto);
    return await this.repository.findOne({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
