import { Controller, Get, Req } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AuthRequest } from 'src/sessions/auth/models/AuthRequest';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  findByUserId(@Req() req: AuthRequest) {
    const { user } = req;

    return this.accountsService.findByUserId(user.id);
  }
}
