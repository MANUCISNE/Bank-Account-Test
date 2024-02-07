import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class ResponseSessionDto {
  @ApiProperty({
    description: 'token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNTdjMzlmYi0wNDRjLTQ1M2MtODIzZS01NjZhYWI3YjFjOTIiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5kb2VAZXhhbXBsZS5jb20iLCJpYXQiOjE1MTYyMzkwMjJ9.kY8ngJxWyeK0tR8ogRkiSId_K1yrRmXnsdLmPSBJ000',
  })
  access_token: string;

  @ApiProperty({
    description: 'User',
    type: User,
  })
  user: User;
}
