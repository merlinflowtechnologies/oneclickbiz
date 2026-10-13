import { PrismaClient } from '@prisma/client';

const rawDbUrl = process.env.DATABASE_URL;

// Only treat database as configured if an explicit, valid DATABASE_URL was provided in .env
export const isDatabaseConfigured = Boolean(
  rawDbUrl &&
  !rawDbUrl.includes('localhost:5432/oneclickbiz') &&
  !rawDbUrl.includes('YOUR_DB_PASSWORD')
);

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/oneclickbiz?schema=public&connect_timeout=2';
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
