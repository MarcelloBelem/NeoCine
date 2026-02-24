import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class PingController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('ping')
  async ping() {
    await this.prismaService.$queryRaw`SELECT 1`;

    return { message: 'pong', database: 'ok' };
  }
}
