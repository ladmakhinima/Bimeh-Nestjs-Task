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
import { ApiTags } from '@nestjs/swagger';
import {
  CreateTransactionDoc,
  GetTransactionByIdDoc,
  GetTransactionReportDoc,
  GetTransactionsDoc,
} from 'src/_docs/transaction';

@ApiTags('transaction')
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

  @GetTransactionReportDoc()
  @Get('report')
  getTransactionTotalAmountReport() {
    return this.transactionService.getAllTotalAmount();
  }

  @CreateTransactionDoc()
  @Post()
  createTransaction(
    @Body() body: AddTransactionDTO,
    @Query('selects', SelectsPipe) select: object,
  ) {
    return this.transactionService.create(body, select);
  }

  @Get(':id')
  @GetTransactionsDoc()
  selectTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Query('selects', SelectsPipe) select: object,
  ) {
    return this.transactionService.selectById(id, select);
  }

  @GetTransactionByIdDoc()
  @Get()
  selectAllTransactions(@Query('selects', SelectsPipe) select: object) {
    return this.transactionService.selectAll(select);
  }
}
