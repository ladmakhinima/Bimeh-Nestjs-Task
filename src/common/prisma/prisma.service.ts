import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  @Inject(PrismaClient)
  public readonly client: PrismaClient;
}
