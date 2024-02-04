import { Body, Controller, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { User } from 'src/users/entities/user.entity';
import { Public } from './auth/decorators/public.decorator';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @Public()
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ access_token: string; user: Partial<User> }> {
    return await this.sessionsService.create({
      email,
      password,
    });
  }
}
