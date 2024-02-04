import { ETypeTransaction } from 'src/utils/enums/ETypeTransaction';

export interface BodyTransactionDto {
  sender_id: string;
  recipient_id?: string;
  value: number;
  type: ETypeTransaction;
}
