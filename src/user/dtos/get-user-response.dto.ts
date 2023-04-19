import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class GetUserResponseDTO implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty({ default: 0 })
  credit: Decimal;

  @ApiProperty()
  createdAt: Date;
}
