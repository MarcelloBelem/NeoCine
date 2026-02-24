import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const connectionString = process.env.DATABASE_URL ?? process.env.DIRECT_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL ou DIRECT_URL não definida');
    }

    const adapter = new PrismaPg({ connectionString });
    super({ adapter });
  }

  async onModuleInit() {
    try {
      // força conexão real
      await this.$queryRaw`SELECT 1`;

      console.log('Database connected');
    } catch (error) {
      console.error('Database unavailable. Application will not start.');
      throw error;
    }
  }
}
