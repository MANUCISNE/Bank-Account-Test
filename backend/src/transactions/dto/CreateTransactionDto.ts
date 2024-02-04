import { ETypeTransaction } from 'src/utils/enums/ETypeTransaction';

export interface CreateTransactionDto {
  user_id: string;
  sender_id: string;
  recipient_id?: string;
  value: number;
  type: ETypeTransaction;
}
