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
import { CreateUserDTO, GetUserResponseDTO } from './dtos';
import { UserService } from './user.service';
import { SelectsPipe } from 'src/pipes/selects.pipe';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @ApiCreatedResponse({
    type: GetUserResponseDTO,
    description: 'create user',
  })
  @ApiBody({ type: CreateUserDTO })
  @Post()
  createUser(
    @Body() body: CreateUserDTO,
    @Query('selects', SelectsPipe) select: object,
  ) {
    return this.userService.create(body, select);
  }

  @ApiOkResponse({
    type: GetUserResponseDTO,
    isArray: true,
    description: 'api for return list of users',
  })
  @ApiQuery({
    name: 'selects',
    required: false,
    example: 'id,credit,name,createdAt',
    description: 'The list of fields you want to select and get from backend',
  })
  @Get()
  selectAllUsers(@Query('selects', SelectsPipe) select: object) {
    return this.userService.selectAll(select);
  }

  @Get(':id')
  @ApiOkResponse({
    type: GetUserResponseDTO,
    description: 'get user by id',
  })
  @ApiParam({ name: 'id', description: 'the user id for selecting' })
  @ApiQuery({
    name: 'selects',
    required: false,
    example: 'id,credit,name,createdAt',
    description: 'The list of fields you want to select and get from backend',
  })
  selectById(
    @Param('id', ParseIntPipe) id: number,
    @Query('selects', SelectsPipe) select: object,
  ) {
    return this.userService.selectById(id, select);
  }
}
