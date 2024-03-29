import { ApiProperty } from '@nestjs/swagger';
import { ETypeAccount } from 'src/utils/enums/ETypeAccount';

export class CreateAccountDto {
  @ApiProperty({
    description: 'User id',
    example: 'dacd6cc9-2b61-4056-a854-b654b00213da',
  })
  user_id: string;

  @ApiProperty({
    description: 'Account Type',
    enum: ETypeAccount,
    example: ETypeAccount.CURRENT_ACCOUNT,
  })
  type_account: ETypeAccount;
}
