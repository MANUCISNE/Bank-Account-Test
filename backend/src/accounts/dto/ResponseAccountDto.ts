import { Account } from '../entities/account.entity';

export interface ResponseAccountDto {
  current_account: Account;
  savings_account: Account;
}
