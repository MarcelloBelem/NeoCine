import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FindByUserParamsDto, UpdateMediaStatusDto } from './dtos/media.dtos';

type MediaStatusResponse = {
  id: number | null;
  isWatched: boolean;
  isWatchlist: boolean;
};

@Injectable()
export class MediaService {
  constructor(private prismaService: PrismaService) {}

  async getStatus(
    userId: string,
    tmdbId: number,
  ): Promise<MediaStatusResponse> {
    const userMedia = await this.prismaService.userMedia.findFirst({
      where: {
        userId,
        media: {
          tmdbId,
        },
      },
      select: {
        id: true,
        isWatched: true,
        inWatchlist: true,
      },
    });

    if (!userMedia) {
      return {
        id: null,
        isWatched: false,
        isWatchlist: false,
      };
    }

    return {
      id: userMedia.id,
      isWatched: userMedia.isWatched,
      isWatchlist: userMedia.inWatchlist,
    };
  }

  async updateStatus(
    userId: string,
    data: UpdateMediaStatusDto & { id: number },
  ) {
    const media = await this.prismaService.media.upsert({
      where: { tmdbId: data.id },
      create: {
        tmdbId: data.id,
        type: data.type,
        duration: data.duration,
        title: data.title,
        genres: data.genres || [],
        vote_average: data.vote_average,
        poster_path: data.poster_path ?? '',
      },
      update: {
        title: data.title,
        genres: data.genres || [],
        vote_average: data.vote_average,
        poster_path: data.poster_path ?? '',
        duration: data.duration,
      },
    });

    const currentRelation = await this.prismaService.userMedia.findUnique({
      where: {
        userId_mediaId: {
          userId: userId,
          mediaId: media.id,
        },
      },
    });

    const nextIsWatched = data.isWatched ?? currentRelation?.isWatched ?? false;
    const nextInWatchlist =
      data.inWatchlist ?? currentRelation?.inWatchlist ?? false;

    return await this.prismaService.userMedia.upsert({
      where: {
        userId_mediaId: {
          userId: userId,
          mediaId: media.id,
        },
      },
      create: {
        userId: userId,
        mediaId: media.id,
        isWatched: nextIsWatched,
        inWatchlist: nextInWatchlist,
      },
      update: {
        isWatched: nextIsWatched,
        inWatchlist: nextInWatchlist,
      },
    });
  }

  async findByUser({ userId, isWatched, inWatchlist }: FindByUserParamsDto) {
    return this.prismaService.userMedia.findMany({
      where: {
        userId,
        ...(isWatched !== undefined && { isWatched }),
        ...(inWatchlist !== undefined && { inWatchlist }),
      },
      include: { media: true },
    });
  }
}
