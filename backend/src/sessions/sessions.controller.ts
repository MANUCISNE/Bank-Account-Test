import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Public } from './auth/decorators/public.decorator';
import { CreateSessionDto } from './dtos/CreateSessionDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseSessionDto } from './dtos/ResponseSessionDto';
import { bodyErrorSwagger } from 'src/utils/swagger/BodyError';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @HttpCode(200)
  @Public()
  @ApiOperation({ summary: 'Log in' })
  @ApiResponse({
    status: 200,
    description: 'Successful login',
    type: ResponseSessionDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - Field validation',
    schema: bodyErrorSwagger(400, 'Bad Request'),
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - Invalid credentials',
    schema: bodyErrorSwagger(401, 'Unauthorized'),
  })
  async login(
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<ResponseSessionDto> {
    return await this.sessionsService.create(createSessionDto);
  }
}
