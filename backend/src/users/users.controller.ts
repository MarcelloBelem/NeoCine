import {
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from './users.service';
import { Request as ExpressRequest } from 'express';
import { UpdateUserDto } from './dtos/update-user.dto';

interface JwtPayload {
  sub: string;
  email?: string;
}

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

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
}
