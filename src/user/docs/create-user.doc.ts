import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDTO, GetUserResponseDTO } from '../dtos';

export function CreateUserDoc() {
  return applyDecorators(
    ApiCreatedResponse({
      type: GetUserResponseDTO,
      description: 'create user',
    }),
    ApiBody({ type: CreateUserDTO }),
  );
}
