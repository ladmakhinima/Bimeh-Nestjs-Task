import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { GetTransactionReportResponse, GetTransactionResponseDTO } from 'src/transaction/dtos';

export function GetTransactionsDoc() {
  return applyDecorators(
    ApiOkResponse({
      type: GetTransactionResponseDTO,
      description: 'Get Single Transaction By Id',
    }),
    ApiParam({
      name: 'id',
      description: 'the id of transaction that you want',
    }),
    ApiQuery({
      name: 'selects',
      example: 'id,userId,referenceId,amount,createdAt',
      description: 'the list of fields that you want from backend',
      required: false,
    }),
  );
}

export function GetTransactionByIdDoc() {
  return applyDecorators(
    ApiOkResponse({
      type: GetTransactionResponseDTO,
      isArray: true,
      description: 'Get all transactions',
    }),
    ApiQuery({
      name: 'selects',
      example: 'id,userId,referenceId,amount,createdAt',
      description: 'the list of fields that you want from backend',
      required: false,
    }),
  );
}

export function GetTransactionReportDoc() {
  return applyDecorators(
    ApiOkResponse({
      description:
        'The api that return all the reported transaction that provide every day',
      type: GetTransactionReportResponse,
      isArray: true,
    }),
  );
}
