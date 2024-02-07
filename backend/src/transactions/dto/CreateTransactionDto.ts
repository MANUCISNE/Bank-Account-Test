import { ApiProperty } from '@nestjs/swagger';
import { ETypeAccount } from 'src/utils/enums/ETypeAccount';
import { ETypeTransaction } from 'src/utils/enums/ETypeTransaction';
import {
  IsUUID,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsPositive,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Account Type',
    enum: ETypeAccount,
    example: ETypeAccount.CURRENT_ACCOUNT,
  })
  @IsEnum(ETypeAccount)
  @IsNotEmpty()
  type_account: ETypeAccount;

  @ApiProperty({
    description: 'Recipient account ID (optional)',
    required: false,
    format: 'uuid',
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  recipient_account_id: string | null;

  @ApiProperty({
    description: 'Transaction value',
    minimum: 0,
  })
  @IsNumber()
  @IsPositive()
  value: number;

  @ApiProperty({
    description: 'Transaction Type',
    enum: ETypeTransaction,
    example: ETypeTransaction.INCOME,
  })
  @IsEnum(ETypeTransaction)
  @IsNotEmpty()
  type: ETypeTransaction;
}
