import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export enum MediaType {
  movie = 'movie',
  tv = 'tv',
}

export class UpdateMediaStatusDto {
  @IsEnum(MediaType)
  type: 'movie' | 'tv';

  @IsString()
  title: string;

  @IsArray()
  @IsInt({ each: true })
  genres: number[] = [];

  @IsNumber()
  vote_average: number;

  @IsOptional()
  @IsString()
  poster_path?: string | null;

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

export class FindByUserParamsDto {
  @IsString()
  userId: string;

  @IsOptional()
  @IsBoolean()
  isWatched?: boolean;

  @IsOptional()
  @IsBoolean()
  inWatchlist?: boolean;
}
