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
import { CreateUserDoc, GetUserByIdDoc, GetUsersDoc } from './docs';

@ApiTags('user')
@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @CreateUserDoc()
  @Post()
  createUser(
    @Body() body: CreateUserDTO,
    @Query('selects', SelectsPipe) select: object,
  ) {
    return this.userService.create(body, select);
  }

  @GetUsersDoc()
  @Get()
  selectAllUsers(@Query('selects', SelectsPipe) select: object) {
    return this.userService.selectAll(select);
  }

  @Get(':id')
  @GetUserByIdDoc()
  selectById(
    @Param('id', ParseIntPipe) id: number,
    @Query('selects', SelectsPipe) select: object,
  ) {
    return this.userService.selectById(id, select);
  }
}
