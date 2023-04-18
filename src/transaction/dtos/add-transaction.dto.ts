import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class AddTransactionDTO {
  @IsNotEmpty()
  @IsInt()
  user: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
