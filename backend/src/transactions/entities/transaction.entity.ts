import { Expose } from 'class-transformer';
import { Account } from 'src/accounts/entities/account.entity';
import { ETypeTransaction } from 'src/utils/enums/ETypeTransaction';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sender_account_id: string;

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn({ name: 'sender_account_id' })
  sender_account: Account;

  @Column()
  recipient_account_id: string;

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn({ name: 'recipient_account_id' })
  recipient_account: Account;

  @Column()
  value: number;

  @Column()
  type: ETypeTransaction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'value_real' })
  getValueReal() {
    if (this.type === ETypeTransaction.OUTCOME) {
      return -this.value;
    }

    return this.value;
  }
}
