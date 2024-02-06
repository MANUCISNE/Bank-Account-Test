import {
  IsUUID,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { ETypeAccount } from 'src/utils/enums/ETypeAccount';
import { ETypeTransaction } from 'src/utils/enums/ETypeTransaction';

export class CreateTransactionDto {
  @IsEnum(ETypeAccount)
  @IsNotEmpty()
  type_account: ETypeAccount;

  @IsUUID()
  @IsOptional()
  recipient_account_id: string | null;

  @IsNumber()
  @IsPositive()
  value: number;

  @IsEnum(ETypeTransaction)
  @IsNotEmpty()
  type: ETypeTransaction;
}
