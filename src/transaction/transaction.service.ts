import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AddTransactionDTO } from './dtos';
import { randomInt } from 'crypto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class TransactionService {
  @Inject(PrismaService)
  private readonly prismaService: PrismaService;

  @Inject(CACHE_MANAGER)
  private readonly cacheService: Cache;

  selectById(id: number, select?: any) {
    return this.prismaService.client.transaction.findUnique({
      where: { id },
      select,
    });
  }

  // Dailytime is every 24 hours
  // if not daily time means it is during the day and dont want to recalculate instead read from cache
  async getTotalAmount(date: string, dailyTime?: boolean) {
    if (!dailyTime) {
      return this.cacheService.get(date);
    }
    const { _sum: totalAmount } =
      await this.prismaService.client.transaction.aggregate({
        _sum: { amount: true },
      });
    this.cacheService.set(date, totalAmount);
    return totalAmount;
  }

  getTotalAmountBasedOnDate(date?: string) {
    if (date) {
      return this.getTotalAmount(date);
    }
    return this.getAllTotalAmount();
  }

  async getAllTotalAmount() {
    const dates = await this.cacheService.store.keys();
    const totalAmountsResult = dates.reduce(
      async (totalAmounts: any, totalAmountKey: string) => {
        const item = await this.getTotalAmount(totalAmountKey);
        totalAmounts.push({ date: totalAmountKey, report: item });
        return totalAmounts;
      },
      [],
    );
    return totalAmountsResult;
  }

  selectAll(select?: any) {
    return this.prismaService.client.transaction.findMany({ select });
  }

  create(data: AddTransactionDTO, select?: any) {
    return this.prismaService.client.$transaction(async (manager) => {
      const user = await manager.user.findUnique({ where: { id: data.user } });
      await manager.user.update({
        data: { credit: +user.credit + +data.amount },
        where: { id: user.id },
      });
      const transaction = await manager.transaction.create({
        data: {
          amount: data.amount,
          userId: user.id,
          referenceId: this._generateReferenceId(),
        },
        select,
      });
      return transaction;
    });
  }

  //!TODO we seprate this method why ?
  // because when we want to change strategy of reference id , dont change main method ( create function )
  private _generateReferenceId() {
    return randomInt(10000000);
  }
}
