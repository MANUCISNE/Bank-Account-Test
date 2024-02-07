import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/CreateAccountDto';
import { UpdateAccountDto } from './dto/UpdateAccountDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { ResponseAccountDto } from './dto/ResponseAccountDto';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { ETypeAccount } from 'src/utils/enums/ETypeAccount';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,

    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = this.accountsRepository.create(createAccountDto);

    await this.accountsRepository.save(account);

    return account;
  }

  async createDual(user_id: string): Promise<ResponseAccountDto> {
    const accounts = Object.values(ETypeAccount).map((type_account) =>
      this.accountsRepository.create({
        user_id,
        type_account,
      }),
    );

    await this.accountsRepository.save(accounts);

    return this.formatObjectAccounts(accounts);
  }

  async findByIdUserId(id: string, user_id: string): Promise<Account> {
    const account = await this.accountsRepository.findOneBy({
      id,
      user_id,
    });

    return account;
  }

  async findByUserId(user_id: string): Promise<ResponseAccountDto> {
    const accounts = await this.accountsRepository.findBy({ user_id });

    if (!accounts || !accounts.length) {
      throw new NotFoundException(['Accounts does not exist!']);
    }

    const transformedObject = this.formatObjectAccounts(accounts);

    return transformedObject;
  }

  async findByUserIdType(
    user_id: string,
    type_account: ETypeAccount,
  ): Promise<Account> {
    const account = await this.accountsRepository.findOneBy({
      user_id,
      type_account,
    });

    return account;
  }

  async updateById({ id, value }: UpdateAccountDto): Promise<Account> {
    const account = await this.accountsRepository.findOneBy({ id });

    if (!account) {
      throw new NotFoundException(['non-existent current account']);
    }

    account.value += value;

    await this.accountsRepository.update(id, account);

    return account;
  }

  async update(account: Account[]): Promise<Account[]> {
    const newAccounts = await this.accountsRepository.save(account);

    return newAccounts;
  }

  async remove(user_id: string): Promise<void> {
    const accounts = await this.findByUserId(user_id);

    if (accounts) {
      const { current_account, savings_account } = accounts;
      await Promise.all([
        this.transactionsRepository.delete({
          sender_account_id: current_account.id,
        }),
        this.transactionsRepository.delete({
          recipient_account_id: current_account.id,
        }),
        this.transactionsRepository.delete({
          sender_account_id: savings_account.id,
        }),
        this.transactionsRepository.delete({
          recipient_account_id: savings_account.id,
        }),
      ]);
    }

    await this.accountsRepository.delete({ user_id });
  }

  private formatObjectAccounts(accounts: Account[]): ResponseAccountDto {
    return accounts.reduce<ResponseAccountDto>((result, item) => {
      const { type_account, ...rest } = item;

      Object.assign(result, {
        [type_account.toLocaleLowerCase()]: { type_account, ...rest },
      });

      return result;
    }, {} as ResponseAccountDto);
  }
}
