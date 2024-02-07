import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/CreateUserDto';
import { User } from './entities/user.entity';
import { AuthRequest } from 'src/sessions/auth/models/AuthRequest';
import { instance, mock, when } from 'ts-mockito';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Account } from 'src/accounts/entities/account.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { Transaction } from 'src/transactions/entities/transaction.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
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

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedResult: User[] = [
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

      jest.spyOn(usersService, 'findAll').mockResolvedValueOnce(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: '123',
      };

      const expectedResult: User = {
        id: 'e6841efb-10f8-4bce-91cf-ccb1319cb340',
        ...createUserDto,
        password: 'hashedPassword',
        created_at: new Date(),
        updated_at: new Date(),
      };

      jest.spyOn(usersService, 'create').mockResolvedValueOnce(expectedResult);

      const result = await controller.create(createUserDto);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const authRequestMock: AuthRequest = mock(AuthRequest);
      const authRequest = instance(authRequestMock);

      when(authRequestMock.user).thenReturn({
        id: 'e6841efb-10f8-4bce-91cf-ccb1319cb340',
        email: 'johndoe@example.com',
        name: 'John Doe',
        password: 'hashedPassword',
        created_at: new Date(),
        updated_at: new Date(),
      });

      jest.spyOn(usersService, 'delete').mockResolvedValueOnce(undefined);

      const result = await controller.remove(authRequest);

      expect(result).toBeUndefined();
    });
  });
});
