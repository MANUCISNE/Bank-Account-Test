import { ApiProperty } from '@nestjs/swagger';
import { Account } from 'src/accounts/entities/account.entity';
import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ETypeTransaction } from 'src/utils/enums/ETypeTransaction';

@Entity()
export class Transaction {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  sender_account_id: string;

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn({ name: 'sender_account_id' })
  sender_account: Account;

  @ApiProperty()
  @Column()
  recipient_account_id: string;

  @ManyToOne(() => Account, (account) => account.id)
  @JoinColumn({ name: 'recipient_account_id' })
  recipient_account: Account;

  @ApiProperty()
  @Column()
  value: number;

  @ApiProperty({
    enum: ETypeTransaction,
  })
  @Column()
  type: ETypeTransaction;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty({
    name: 'value_real',
    type: 'number',
  })
  @Expose({ name: 'value_real' })
  getValueReal() {
    if (this.type === ETypeTransaction.OUTCOME) {
      return -this.value;
    }

    return this.value;
  }
}
