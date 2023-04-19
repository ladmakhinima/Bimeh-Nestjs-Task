import { applyDecorators } from '@nestjs/common';
import { GetUserResponseDTO } from '../dtos';
import { ApiOkResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

export function GetUsersDoc() {
  return applyDecorators(
    ApiOkResponse({
      type: GetUserResponseDTO,
      isArray: true,
      description: 'api for return list of users',
    }),
    ApiQuery({
      name: 'selects',
      required: false,
      example: 'id,credit,name,createdAt',
      description: 'The list of fields you want to select and get from backend',
    }),
  );
}

export function GetUserByIdDoc() {
  return applyDecorators(
    ApiOkResponse({
      type: GetUserResponseDTO,
      description: 'get user by id',
    }),
    ApiParam({ name: 'id', description: 'the user id for selecting' }),
    ApiQuery({
      name: 'selects',
      required: false,
      example: 'id,credit,name,createdAt',
      description: 'The list of fields you want to select and get from backend',
    }),
  );
}
