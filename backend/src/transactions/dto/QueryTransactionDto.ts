import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ETypeAccount } from 'src/utils/enums/ETypeAccount';

export class QueryTransactionDto {
  @ApiProperty({
    description: 'Account Type',
    enum: ETypeAccount,
    example: ETypeAccount.CURRENT_ACCOUNT,
    required: false,
  })
  @IsOptional()
  @IsEnum(ETypeAccount)
  type_account?: ETypeAccount;
}
