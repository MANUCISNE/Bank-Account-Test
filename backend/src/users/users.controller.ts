import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUserDto';
import { Public } from 'src/sessions/auth/decorators/public.decorator';
import { AuthRequest } from 'src/sessions/auth/models/AuthRequest';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Public()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @Public()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Delete()
  remove(@Req() req: AuthRequest) {
    const { user } = req;
    return this.usersService.delete(user.id);
  }
}
