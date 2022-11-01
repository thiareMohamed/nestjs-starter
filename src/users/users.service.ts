import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (this.userRepository.findOne({ where: { email: createUserDto.email } })) {
      throw new ConflictException('Email already exists');
    }
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (!id) {
      throw new Error('Id is required');
    }
    if (!this.userRepository.findOne({ where: { id } })) {
      throw new Error('User not found');
    }
    const user = await this.userRepository.findOne({
      where: { id },
    });
    this.userRepository.merge(user, updateUserDto);
    await this.userRepository.save(user);
    return user;
  }

  async remove(id: number) {
    if (!id) {
      throw new Error('Id is required');
    }
    if (!this.userRepository.findOne({ where: { id } })) {
      throw new Error('User not found');
    }
    const user = await this.userRepository.findOne({
      where: { id },
    });
    await this.userRepository.remove(user);
    return { message: 'User deleted' };
  }
}
