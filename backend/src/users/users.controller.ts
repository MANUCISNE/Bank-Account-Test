import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUserDto';
import {
  ApiResponse,
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Public } from 'src/sessions/auth/decorators/public.decorator';
import { bodyErrorSwagger } from 'src/utils/swagger/BodyError';
import { AuthRequest } from 'src/sessions/auth/models/AuthRequest';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Public()
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Successfully obtained user list',
    type: User,
    isArray: true,
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Field validation',
    schema: bodyErrorSwagger(400, 'Bad Request'),
  })
  @ApiResponse({
    status: 409,
    description: 'Conflict - Email is already in use',
    schema: bodyErrorSwagger(409, 'Conflict'),
  })
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: bodyErrorSwagger(401, 'Unauthorized'),
  })
  @ApiBearerAuth()
  remove(@Req() req: AuthRequest) {
    const { user } = req;
    return this.usersService.delete(user.id);
  }
}
