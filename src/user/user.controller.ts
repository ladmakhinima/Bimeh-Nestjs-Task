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
import { CreateUserDTO } from './dtos';
import { UserService } from './user.service';
import { SelectsPipe } from 'src/pipes/selects.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Post()
  createUser(
    @Body() body: CreateUserDTO,
    @Query('selects', SelectsPipe) select: object,
  ) {
    return this.userService.create(body, select);
  }

  @Get()
  selectAllUsers(@Query('selects', SelectsPipe) select: object) {
    return this.userService.selectAll(select);
  }

  @Get(':id')
  selectById(
    @Param('id', ParseIntPipe) id: number,
    @Query('selects', SelectsPipe) select: object,
  ) {
    return this.userService.selectById(id, select);
  }
}
