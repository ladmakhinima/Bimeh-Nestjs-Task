import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserDTO } from './dtos';

@Injectable()
export class UserService {
  @Inject(PrismaService)
  private readonly prismaService: PrismaService;

  async create(data: CreateUserDTO) {
    const duplicateByName = await this.prismaService.client.user.findFirst({
      where: { name: data.name },
    });
    if (duplicateByName) {
      throw new ConflictException('duplicate user by name');
    }
    return this.prismaService.client.user.create({ data: { name: data.name } });
  }

  selectAll() {
    return this.prismaService.client.user.findMany();
  }

  async addCredit(id: number, credit: number) {
    const user = await this.selectById(id);
    return this.prismaService.client.user.update({
      where: { id: user.id },
      data: { credit: +user.credit + +credit },
    });
  }

  async selectById(id: number) {
    const user = await this.prismaService.client.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
