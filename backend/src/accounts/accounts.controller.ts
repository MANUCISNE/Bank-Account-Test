import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AuthRequest } from 'src/sessions/auth/models/AuthRequest';
import { Public } from 'src/sessions/auth/decorators/public.decorator';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  findByUserId(@Req() req: AuthRequest) {
    const { user } = req;

    return this.accountsService.findByUserId(user.id);
  }

  @Post()
  @Public()
  create(@Body() body) {
    return this.accountsService.create(body);
  }
}
