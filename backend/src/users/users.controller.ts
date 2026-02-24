import {
  Body,
  Controller,
  Get,
  Patch,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { getMediaByUserDto, UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Request as ExpressRequest } from 'express';
import { JwtPayload } from 'src/types/jwt';
import { MediaService } from 'src/media/media.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private mediaService: MediaService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('me')
  async getProfile(@Request() req: ExpressRequest & { user: JwtPayload }) {
    return await this.usersService.profile(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch('me/edit')
  async editProfile(
    @Request() req: ExpressRequest & { user: JwtPayload },
    @Body() updateData: UpdateUserDto,
  ) {
    const userId = req.user.sub;

    return await this.usersService.editProfile(userId, updateData);
  }

  @UseGuards(AuthGuard)
  @Get('me/media')
  async getUserMedia(
    @Request() req: ExpressRequest & { user: JwtPayload },
    @Query() query: getMediaByUserDto,
  ) {
    const userId = req.user.sub;

    return this.mediaService.findByUser({
      userId,
      ...query,
    });
  }
}
