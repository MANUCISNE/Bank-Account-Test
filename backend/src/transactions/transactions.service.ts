import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/CreateTransactionDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { QueryTransactionDto } from './dto/QueryTransactionDto';
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

  async create(
    user_id: string,
    { type_account, recipient_account_id, type, value }: CreateTransactionDto,
  ): Promise<Transaction> {
    const accountSender = await this.accountsService.findByUserIdType(
      user_id,
      type_account,
    );
    if (!accountSender) {
      throw new NotFoundException(['Sender account does not exist!']);
    }

    let accountRecipient: Account;
    if (recipient_account_id && accountSender.id !== recipient_account_id) {
      if (type !== ETypeTransaction.TRANSFER) {
        throw new BadRequestException([
          'If recipient_account is not null, type must be TRANSFER',
        ]);
      }

      accountRecipient = await this.accountsService.findByIdUserId(
        recipient_account_id,
        user_id,
      );
      if (!accountRecipient) {
        throw new NotFoundException(['Recipient account does not exist!']);
      }
    } else if (
      recipient_account_id &&
      accountSender.id === recipient_account_id &&
      type === ETypeTransaction.TRANSFER
    ) {
      throw new BadRequestException([
        'Sender and recipient accounts cannot be TRANSFER type',
      ]);
    } else {
      accountRecipient = accountSender;
      if (type === ETypeTransaction.TRANSFER) {
        throw new BadRequestException([
          'If recipient_account is null, type must be OUTCOME or INCOME',
        ]);
      }
    }

    if (
      [ETypeTransaction.OUTCOME, ETypeTransaction.TRANSFER].includes(type) &&
      accountSender.value < value
    ) {
      throw new BadRequestException(['Insufficient balance']);
    }

    const transaction = this.transactionsRepository.create({
      sender_account_id: accountSender.id,
      recipient_account_id: accountRecipient.id ?? accountSender.id,
      type,
      value,
    });

    const updateAccounts: Account[] = [];
    if (type === ETypeTransaction.TRANSFER) {
      accountSender.value -= value;
      accountRecipient.value += value;
      updateAccounts.push(accountRecipient);
    } else {
      accountSender.value +=
        type === ETypeTransaction.INCOME ? value : value * -1;
    }
    updateAccounts.push(accountSender);

    await Promise.all([
      this.accountsService.update(updateAccounts),
      this.transactionsRepository.save(transaction),
    ]);

    return transaction;
  }

  async findByUserId(
    user_id: string,
    { type_account }: QueryTransactionDto = null,
  ): Promise<Transaction[]> {
    const transactions = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.sender_account', 'sender_account')
      .leftJoin('transaction.recipient_account', 'recipient_account')
      .addSelect([
        'sender_account.id',
        'sender_account.user_id',
        'sender_account.type_account',
      ])
      .addSelect([
        'recipient_account.id',
        'recipient_account.user_id',
        'recipient_account.type_account',
      ])
      .where(
        `
          (sender_account.user_id = :user_id ${type_account ? `AND sender_account.type_account = '${type_account}'` : ``})
        `,
        { user_id },
      )
      .orderBy('transaction.created_at', 'DESC')
      .getMany();

    return transactions;
  }

  findById(id: string): Promise<Transaction> {
    const transaction = this.transactionsRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.sender_account', 'sender_account')
      .leftJoin('transaction.recipient_account', 'recipient_account')
      .addSelect([
        'sender_account.id',
        'sender_account.user_id',
        'sender_account.type_account',
      ])
      .addSelect([
        'recipient_account.id',
        'recipient_account.user_id',
        'recipient_account.type_account',
      ])
      .where('transaction.id = :id', { id })
      .getOne();

    return transaction;
  }

  async removeAccount(account_id: string) {
    return Promise.all([
      this.transactionsRepository.delete({ sender_account_id: account_id }),
      this.transactionsRepository.delete({ recipient_account_id: account_id }),
    ]);
  }
}
