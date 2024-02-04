import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/CreateTransactionDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { Account } from 'src/accounts/entities/account.entity';
import { ETypeTransaction } from 'src/utils/enums/ETypeTransaction';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    private readonly accountsService: AccountsService,
  ) {}

  async create({
    user_id,
    sender_id,
    recipient_id,
    type,
    value,
  }: CreateTransactionDto): Promise<Transaction> {
    const accountSender = await this.accountsService.findByIdUserId(
      sender_id,
      user_id,
    );
    if (!accountSender) {
      throw new NotFoundException('Sender account does not exist');
    }

    let accountRecipient: Account;
    if (recipient_id) {
      accountRecipient = await this.accountsService.findByIdUserId(
        recipient_id,
        user_id,
      );
      if (type !== ETypeTransaction.TRANSFER) {
        throw new NotFoundException('Tipo errado');
      }
    } else {
      accountRecipient = accountSender;
      if (type === ETypeTransaction.TRANSFER) {
        throw new NotFoundException('Tipo errado');
      }
    }
    if (!accountRecipient) {
      throw new NotFoundException('Recipient account does not exist');
    }

    if (type === ETypeTransaction.OUTCOME && accountSender.value < value) {
      throw new NotFoundException('Saldo insuficiente');
    }

    if (type === ETypeTransaction.TRANSFER && accountSender.value < value) {
      throw new NotFoundException('Saldo insuficiente');
    }

    const transaction = this.transactionsRepository.create({
      sender_id,
      recipient_id: recipient_id ?? sender_id,
      type,
      value,
    });

    if (type === ETypeTransaction.TRANSFER) {
      accountSender.value -= value;
      accountRecipient.value += value;
      await Promise.all([
        this.accountsService.update(accountSender),
        this.accountsService.update(accountRecipient),
        this.transactionsRepository.save(transaction),
      ]);
    } else {
      accountSender.value +=
        type === ETypeTransaction.INCOME ? value : value * -1;

      await Promise.all([
        this.accountsService.update(accountSender),
        this.transactionsRepository.save(transaction),
      ]);
    }

    return transaction;
  }

  async findByUserId(user_id: string): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository.find({
      where: [{ sender: { user_id } }, { recipient: { user_id } }],
      relations: {
        sender: true,
        recipient: true,
      },
    });

    return transactions;
  }

  findById(id: string): Promise<Transaction> {
    const transaction = this.transactionsRepository.findOneBy({
      id,
    });

    return transaction;
  }
}
