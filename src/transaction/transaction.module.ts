import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    PrismaModule,
    ScheduleModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      // refer to cache for 1 month
      ttl: 60 * 60 * 24 * 30,
    }),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
