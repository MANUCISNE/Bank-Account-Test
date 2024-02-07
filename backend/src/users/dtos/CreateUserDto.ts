import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name',
    minLength: 1,
    maxLength: 21,
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 21)
  name: string;

  @ApiProperty({
    description: 'User email',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User password',
    minLength: 3,
    maxLength: 10,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  password: string;
}
