import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from "@prisma/client";
import { env } from 'prisma/config';


const adapter = new PrismaBetterSQLite3({
  url: env("DATABASE_URL")
});

export const prisma = new PrismaClient({ adapter });