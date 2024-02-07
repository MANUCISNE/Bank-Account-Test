import { Controller, Get, Req } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseAccountDto } from './dto/ResponseAccountDto';
import { bodyErrorSwagger } from 'src/utils/swagger/BodyError';
import { AuthRequest } from 'src/sessions/auth/models/AuthRequest';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  @ApiOperation({ summary: 'Search customer accounts' })
  @ApiResponse({
    status: 200,
    description: 'Account found successfully',
    type: ResponseAccountDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
    schema: bodyErrorSwagger(401, 'Unauthorized'),
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found - Accounts does not exist!',
    schema: bodyErrorSwagger(404, 'Not Found'),
  })
  @ApiBearerAuth()
  findByUserId(@Req() req: AuthRequest): Promise<ResponseAccountDto> {
    const { user } = req;

    return this.accountsService.findByUserId(user.id);
  }
}
