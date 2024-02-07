import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/CreateUserDto';
import { ConflictException } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Account } from 'src/accounts/entities/account.entity';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let accountsService: AccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        AccountsService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Account),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Transaction),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    accountsService = module.get<AccountsService>(AccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
    expect(accountsService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '123',
      };

      jest.spyOn(userRepository, 'findOneBy').mockReturnValueOnce(undefined);
      jest.mock('bcrypt', () => ({
        hash: jest.fn().mockResolvedValue('hashedPassword'),
      }));
      jest
        .spyOn(userRepository, 'create')
        .mockReturnValueOnce(createUserDto as User);
      jest
        .spyOn(userRepository, 'save')
        .mockResolvedValueOnce(createUserDto as User);

      jest
        .spyOn(accountsService, 'createDual')
        .mockResolvedValueOnce(undefined);

      const result = await service.create(createUserDto);

      expect(result).toEqual(createUserDto as User);
    });

    it('should throw ConflictException if user already exists', async () => {
      const createUserDto: CreateUserDto = {
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '123',
      };

      jest
        .spyOn(userRepository, 'findOneBy')
        .mockResolvedValueOnce(createUserDto as User);

      await expect(service.create(createUserDto)).rejects.toThrowError(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: 'e6841efb-10f8-4bce-91cf-ccb1319cb340',
          email: 'johndoe@example.com',
          name: 'John Doe',
          password: 'hashedPassword',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '15142fc5-3d25-4a21-b66d-3beb0fb25725',
          email: 'paulodoe@example.com',
          name: 'Paulo Doe',
          password: 'hashedPassword',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      jest.spyOn(userRepository, 'find').mockResolvedValueOnce(users);

      const result = await service.findAll();

      expect(result).toEqual(users);
    });
  });

  describe('findById', () => {
    it('should return a user by ID', async () => {
      const user_id = 'e6841efb-10f8-4bce-91cf-ccb1319cb340';
      const user: User = {
        id: user_id,
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: 'hashedPassword',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(userRepository, 'findOneBy').mockResolvedValueOnce(user);

      const result = await service.findById(user_id);

      expect(result).toEqual(user);
    });
  });

  describe('delete', () => {
    it('should delete a user and associated accounts', async () => {
      const user_id = 'e6841efb-10f8-4bce-91cf-ccb1319cb340';

      const accountsServiceRemoveSpy = jest
        .spyOn(accountsService, 'remove')
        .mockResolvedValueOnce(undefined);

      const removeSpy = jest
        .spyOn(userRepository, 'delete')
        .mockResolvedValueOnce(undefined);

      await service.delete(user_id);

      expect(accountsServiceRemoveSpy).toHaveBeenCalledWith(user_id);
      expect(removeSpy).toHaveBeenCalledWith(user_id);
    });
  });
});
