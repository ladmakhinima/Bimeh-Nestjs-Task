import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

export class GetTransactionResponseDTO implements Transaction {
  @ApiProperty()
  id: number;

  @ApiProperty()
  referenceId: number;

  @ApiProperty({ default: 0 })
  amount: Decimal;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ default: 1 })
  userId: number;
}

export class GetTransactionReportAmount {
  @ApiProperty({ default: 0 })
  amount: number;
}

export class GetTransactionReportResponse {
  @ApiProperty()
  date: string;
  @ApiProperty()
  report: GetTransactionReportAmount;
}
