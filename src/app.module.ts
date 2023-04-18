import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TransactionModule,
    UserModule,
  ],
})
export class AppModule {}
