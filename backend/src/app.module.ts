import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { MediaModule } from './media/media.module';
import { PingController } from './ping.controller';
@Module({
  imports: [PrismaModule, AuthModule, UsersModule, MediaModule],
  controllers: [PingController],
  providers: [],
})
export class AppModule {}
