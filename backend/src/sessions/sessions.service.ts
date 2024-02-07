import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateSessionDto } from './dtos/CreateSessionDto';
import { ResponseSessionDto } from './dtos/ResponseSessionDto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create({
    email,
    password,
  }: CreateSessionDto): Promise<ResponseSessionDto> {
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException(['Invalid credentials']);
    }

    const session = await this.authToken(user);

    return session;
  }

  /* internal functions */
  private async validateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      return null;
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      return null;
    }

    return user;
  }

  private async authToken(user: User): Promise<ResponseSessionDto> {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });

    return { user, access_token: token };
  }
}
