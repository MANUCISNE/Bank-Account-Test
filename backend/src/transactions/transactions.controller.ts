import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthRequest } from 'src/sessions/auth/models/AuthRequest';
import { BodyTransactionDto } from './dto/BodyTransactionDto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Post()
  create(
    @Req() req: AuthRequest,
    @Body() bodyTransactionDto: BodyTransactionDto,
  ) {
    const { user } = req;

    return this.transactionsService.create({
      ...bodyTransactionDto,
      user_id: user.id,
    });
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
