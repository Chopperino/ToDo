require('dotenv').config({ path: '.env.test' });
const { execSync } = require('child_process');
const { PrismaClient } = require('../../../generated/prisma');

const prisma = new PrismaClient();

beforeAll(async () => {
  execSync('npx prisma db push --schema=prisma/schema.prisma', {
    stdio: 'inherit',
    env: {
      ...process.env,
      DOTENV_CONFIG_PATH: '.env.test',
    }
  });
});

beforeEach(async () => {
  const tablenames = await prisma.$queryRaw`SELECT tablename FROM pg_tables WHERE schemaname='public';`;
  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE;`);
    }
  }
});

afterAll(async () => {
  await prisma.$disconnect();
});