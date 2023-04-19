import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import {
  AddTransactionDTO,
  GetTransactionResponseDTO,
} from 'src/transaction/dtos';

export function CreateTransactionDoc() {
  return applyDecorators(
    ApiBody({
      type: AddTransactionDTO,
    }),
    ApiCreatedResponse({
      type: GetTransactionResponseDTO,
      description: 'api for transfering money to wallet',
    }),
  );
}
