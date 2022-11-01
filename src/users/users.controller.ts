import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, SerializeOptions } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SerializedUser, User } from '../entities/user.entity';
import { NotFoundException, ConflictException } from 'src/config/exception/exceptions';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<SerializedUser> {
    try {
      const user = await this.usersService.create(createUserDto);
      return new SerializedUser(user);
    } catch (error) {
      throw new ConflictException("User already exists");
    }
  }

  @Get()
  async findAll(): Promise<SerializedUser[]> {
    const users = await this.usersService.findAll();
    return users.map(user => new SerializedUser(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SerializedUser> {
    try {
      const user = await this.usersService.findOne(+id);
      if (user.id) return new SerializedUser(user);
    } catch (error) {
      throw new NotFoundException("User not found");
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    try {
      return await this.usersService.update(+id, updateUserDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.usersService.remove(+id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
 