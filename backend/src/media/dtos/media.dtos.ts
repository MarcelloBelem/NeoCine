import { IsBoolean, IsEnum, IsInt, IsOptional, Min } from 'class-validator';

export enum MediaType {
  movie = 'movie',
  tv = 'tv',
}

export class UpdateMediaStatusDto {
  @IsEnum(MediaType)
  type: 'movie' | 'tv';

  @IsOptional()
  @IsInt()
  @Min(0)
  duration?: number;

  @IsOptional()
  @IsBoolean()
  isWatched?: boolean;

  @IsOptional()
  @IsBoolean()
  inWatchlist?: boolean;
}
