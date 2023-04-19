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
import {
  AddTransactionDTO,
  GetTransactionReportResponse,
  GetTransactionResponseDTO,
} from './dtos';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SelectsPipe } from 'src/pipes/selects.pipe';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

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

  @ApiOkResponse({
    description:
      'The api that return all the reported transaction that provide every day',
    type: GetTransactionReportResponse,
    isArray: true,
  })
  @Get('report')
  getTransactionTotalAmountReport() {
    return this.transactionService.getAllTotalAmount();
  }

  @ApiBody({
    type: AddTransactionDTO,
  })
  @ApiCreatedResponse({
    type: GetTransactionResponseDTO,
    description: 'api for transfering money to wallet',
  })
  @Post()
  createTransaction(
    @Body() body: AddTransactionDTO,
    @Query('selects', SelectsPipe) select: object,
  ) {
    return this.transactionService.create(body, select);
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetTransactionResponseDTO,
    description: 'Get Single Transaction By Id',
  })
  @ApiParam({
    name: 'id',
    description: 'the id of transaction that you want',
  })
  @ApiQuery({
    name: 'selects',
    example: 'id,userId,referenceId,amount,createdAt',
    description: 'the list of fields that you want from backend',
    required: false,
  })
  selectTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Query('selects', SelectsPipe) select: object,
  ) {
    return this.transactionService.selectById(id, select);
  }

  @ApiOkResponse({
    type: GetTransactionResponseDTO,
    isArray: true,
    description: 'Get all transactions',
  })
  @ApiQuery({
    name: 'selects',
    example: 'id,userId,referenceId,amount,createdAt',
    description: 'the list of fields that you want from backend',
    required: false,
  })
  @Get()
  selectAllTransactions(@Query('selects', SelectsPipe) select: object) {
    return this.transactionService.selectAll(select);
  }
}
