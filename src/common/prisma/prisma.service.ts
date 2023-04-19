import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  @Inject(PrismaClient)
  public readonly client: PrismaClient;

  // THROW 404 ERROR EXCEPTION
  notFoundExceptionPrisma() {
    this.client.$use(async (prisma, next) => {
      const result = await next(prisma);
      if (prisma.action === 'findFirst' || prisma.action === 'findUnique') {
        if (!result) {
          throw new NotFoundException(`${prisma.model} not found`);
        }
      }
      return result;
    });
  }
}
