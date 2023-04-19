import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class AddTransactionDTO {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: 'the user that you want to change wallet current amount',
    default: 1,
  })
  user: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'the amount of money that you want to transfer',
    default: 0,
  })
  amount: number;
}
