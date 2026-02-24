import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request as ExpressRequest } from 'express';
import { JwtPayload } from 'src/types/jwt';
import { UpdateMediaStatusDto } from './dtos/media.dtos';

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @UseGuards(AuthGuard)
  @Patch(':tmdbId')
  async updateStatus(
    @Param('tmdbId') tmdbId: string,
    @Request() req: ExpressRequest & { user: JwtPayload },
    @Body()
    body: UpdateMediaStatusDto,
  ) {
    const userId = req.user.sub;
    return await this.mediaService.updateStatus(userId, {
      id: Number(tmdbId),
      ...body,
    });
  }

  @UseGuards(AuthGuard)
  @Get(':tmdbId/status')
  async getStatus(
    @Param('tmdbId', ParseIntPipe) tmdbId: number,
    @Request() req: ExpressRequest & { user: JwtPayload },
  ): Promise<{ id: number | null; isWatched: boolean; isWatchlist: boolean }> {
    const userId = req.user.sub;
    return await this.mediaService.getStatus(userId, tmdbId);
  }
}
