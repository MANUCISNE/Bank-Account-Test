import { Account } from 'src/accounts/entities/account.entity';
import { ETypeTransaction } from 'src/utils/enums/ETypeTransaction';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  AfterLoad,
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
  sender: Account;

  @Column()
  recipient_account_id: string;

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn({ name: 'recipient_account_id' })
  recipient: Account;

  @Column()
  value: number;

  @Column()
  type: ETypeTransaction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  value_real: number;

  @AfterLoad()
  calculateValueReal() {
    if (this.type === ETypeTransaction.OUTCOME) {
      this.value_real = -this.value;
    }

    this.value_real = this.value;
  }
}
