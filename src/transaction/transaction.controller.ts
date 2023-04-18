import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { AddTransactionDTO } from './dtos';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SelectsPipe } from 'src/pipes/selects.pipe';

@Controller('transaction')
export class TransactionController {
  @Inject(TransactionService)
  private readonly transactionService: TransactionService;

  @Cron(CronExpression.EVERY_10_SECONDS)
  async getDailyTransactionTotalAmount() {
    const totalAmount = await this.transactionService.getTotalAmount(
      new Date().toLocaleDateString(),
      true,
    );
    console.log(totalAmount);
  }

  @Get('report/:date')
  getTotalAmountReportBasedOnDate(@Param('date') date: string) {
    return this.transactionService.getTotalAmountBasedOnDate(date);
  }

  @Get('report')
  getTransactionTotalAmountReport() {
    return this.transactionService.getTotalAmountBasedOnDate();
  }

  @Post()
  createTransaction(
    @Body() body: AddTransactionDTO,
    @Query('selects', SelectsPipe) select: object,
  ) {
    return this.transactionService.create(body, select);
  }

  @Get(':id')
  selectTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Query('selects', SelectsPipe) select: object,
  ) {
    return this.transactionService.selectById(id, select);
  }

  @Get()
  selectAllTransactions(@Query('selects', SelectsPipe) select: object) {
    return this.transactionService.selectAll(select);
  }
}
