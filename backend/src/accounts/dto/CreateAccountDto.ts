import { ETypeAccount } from 'src/utils/enums/ETypeAccount';

export interface CreateAccountDto {
  user_id: string;
  type_account: ETypeAccount;
}
