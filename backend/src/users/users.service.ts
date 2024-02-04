import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/CreateUserDto';
import { User } from './entities/user.entity';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly accountsService: AccountsService,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userAlreadyExists = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });

    if (userAlreadyExists) {
      throw new ConflictException('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 8);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    await this.accountsService.createDual(user.id);

    Object.assign(user, { password: undefined });

    return user;
  }

  async delete(id: string): Promise<void> {
    this.userRepository.delete(id);
  }
}
