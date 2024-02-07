import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../entities/account.entity';

export class ResponseAccountDto {
  @ApiProperty({
    description: 'User current account',
    type: Account,
  })
  current_account: Account;

  @ApiProperty({
    description: 'User savings account',
    type: Account,
  })
  savings_account: Account;
}
