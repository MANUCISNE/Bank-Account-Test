import { ETypeTransaction } from 'src/utils/enums/ETypeTransaction';

export interface BodyTransactionDto {
  sender_account_id: string;
  recipient_account_id?: string;
  value: number;
  type: ETypeTransaction;
}
