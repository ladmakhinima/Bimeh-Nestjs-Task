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

@Controller('user')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Post()
  createUser(@Body() body: CreateUserDTO) {
    return this.userService.create(body);
  }

  @Get()
  selectAllUsers() {
    return this.userService.selectAll();
  }

  @Get(':id')
  selectById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.selectById(id);
  }
}
