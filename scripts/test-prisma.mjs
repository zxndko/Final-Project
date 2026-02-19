import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Using DATABASE_URL=', process.env.DATABASE_URL?.slice(0, 80) + '...');
  const doctors = await prisma.doctor.findMany();
  console.log('Found', doctors.length, 'doctors');
  console.dir(doctors, { depth: null });
}

main()
  .catch((e) => {
    console.error('Prisma test error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
