import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Mikel Jakson', credit: 10000 },
      {
        name: 'Mark Zakergberg',
        credit: 20000,
      },
      { name: 'Bill Gate', credit: 30000 },
      { name: 'Ellon Musk', credit: 40000 },
    ],
  });
  console.log('User Seed Inserted ...');

  await prisma.transaction.createMany({
    data: [
      {
        amount: 10000,
        userId: 1,
        referenceId: 1,
      },
      {
        amount: 20000,
        userId: 2,
        referenceId: 2,
      },
      {
        amount: 30000,
        userId: 3,
        referenceId: 3,
      },
      {
        amount: 40000,
        userId: 4,
        referenceId: 4,
      },
    ],
  });

  console.log('Transaction inserted ...');
}

main().finally(() => {
  prisma.$disconnect();
});
