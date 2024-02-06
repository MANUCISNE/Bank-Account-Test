import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { User } from 'src/users/entities/user.entity';
import { Public } from './auth/decorators/public.decorator';
import { CreateSessionDto } from './dtos/CreateSessionDto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @HttpCode(200)
  @Public()
  async login(
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<{ access_token: string; user: User }> {
    return await this.sessionsService.create(createSessionDto);
  }
}
