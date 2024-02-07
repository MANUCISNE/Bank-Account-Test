import { Controller, Get, Post, Body, Param, Req, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/CreateTransactionDto';
import { QueryTransactionDto } from './dto/QueryTransactionDto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Transaction } from './entities/transaction.entity';
import { bodyErrorSwagger } from 'src/utils/swagger/BodyError';
import { AuthRequest } from 'src/sessions/auth/models/AuthRequest';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({
    status: 201,
    description: 'Transaction created successfully',
    type: Transaction,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    schema: bodyErrorSwagger(400, 'Bad Request'),
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: bodyErrorSwagger(401, 'Unauthorized'),
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Sender account does not exist!',
    schema: bodyErrorSwagger(404, 'Not Found'),
  })
  @ApiBearerAuth()
  create(
    @Req() req: AuthRequest,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const { user } = req;

    return this.transactionsService.create(user.id, createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Search transaction by user ID' })
  @ApiResponse({
    status: 200,
    description: 'Transactions found successfully',
    type: Transaction,
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: bodyErrorSwagger(401, 'Unauthorized'),
  })
  @ApiBearerAuth()
  findByUserId(@Req() req: AuthRequest, @Query() query: QueryTransactionDto) {
    const { user } = req;

    return this.transactionsService.findByUserId(user.id, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Search transaction by ID' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Transaction found successfully',
    type: Transaction,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: bodyErrorSwagger(401, 'Unauthorized'),
  })
  @ApiBearerAuth()
  findById(@Param('id') id: string) {
    return this.transactionsService.findById(id);
  }
}
