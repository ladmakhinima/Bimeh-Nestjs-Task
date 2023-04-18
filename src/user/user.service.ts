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

  async create(data: CreateUserDTO, select?: any) {
    const duplicateByName = await this.prismaService.client.user.findFirst({
      where: { name: data.name },
    });
    if (duplicateByName) {
      throw new ConflictException('duplicate user by name');
    }
    return this.prismaService.client.user.create({
      data: { name: data.name },
      select,
    });
  }

  selectAll(select?: any) {
    return this.prismaService.client.user.findMany({ select });
  }

  async selectById(id: number, select?: any) {
    const user = await this.prismaService.client.user.findUnique({
      where: { id },
      select,
    });
    return user;
  }
}
