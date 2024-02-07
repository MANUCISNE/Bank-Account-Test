import { User } from 'src/users/entities/user.entity';
import { Request } from 'express';

export class AuthRequest extends Request {
  user: User;
}
