import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthRequest } from 'src/sessions/auth/models/AuthRequest';
import { CreateTransactionDto } from './dto/CreateTransactionDto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @Req() req: AuthRequest,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const { user } = req;

    return this.transactionsService.create(user.id, createTransactionDto);
  }

  @Get()
  findByUserId(@Req() req: AuthRequest) {
    const { user } = req;

    return this.transactionsService.findByUserId(user.id);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.transactionsService.findById(id);
  }
}
