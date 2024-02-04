import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccountDto } from './dto/CreateAccountDto';
import { UpdateAccountDto } from './dto/UpdateAccountDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { ETypeAccount } from 'src/utils/enums/ETypeAccount';
import { ResponseAccountDto } from './dto/ResponseAccountDto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const account = this.accountsRepository.create(createAccountDto);

    await this.accountsRepository.save(account);

    return account;
  }

  async createDual(user_id: string): Promise<ResponseAccountDto> {
    const currentAccount = this.accountsRepository.create({
      user_id,
      type_account: ETypeAccount.CURRENT_ACCOUNT,
    });

    const savingsAccount = this.accountsRepository.create({
      user_id,
      type_account: ETypeAccount.SAVINGS_ACCOUNT,
    });

    await Promise.all([
      this.accountsRepository.save(currentAccount),
      this.accountsRepository.save(savingsAccount),
    ]);

    return { current_account: currentAccount, savings_account: savingsAccount };
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

    const transformedObject = accounts.reduce<ResponseAccountDto>(
      (result, item) => {
        const { type_account, ...rest } = item;

        if (type_account === ETypeAccount.SAVINGS_ACCOUNT) {
          result.savings_account = { type_account, ...rest };
        } else if (type_account === ETypeAccount.CURRENT_ACCOUNT) {
          result.current_account = { type_account, ...rest };
        }

        return result;
      },
      {} as ResponseAccountDto,
    );

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
      throw new NotFoundException('non-existent current account');
    }

    account.value += value;

    await this.accountsRepository.update(id, account);

    return account;
  }

  async update(account: Account): Promise<Account> {
    const newAccount = await this.accountsRepository.save(account);

    return newAccount;
  }

  async remove(user_id: string): Promise<void> {
    await this.accountsRepository.delete({ user_id });
  }
}
