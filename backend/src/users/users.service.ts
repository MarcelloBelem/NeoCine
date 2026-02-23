import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async profile(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return {
      user: user.id,
      email: user.email,
      name: user.name,
      bio: user.bio,
      registeredAt: user.createdAt,
    };
  }

  async editProfile(userId: string, data: UpdateUserDto) {
    await this.prismaService.user.update({
      where: { id: userId },
      data: data,
    });
    return { message: 'Perfil atualizado com sucesso!' };
  }
}
