import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginDto, RegisterDto } from './dtos/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  private async generateTokens(user: {
    id: string;
    email: string;
    name: string;
    birthdate: Date;
  }) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h',
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: process.env.JWT_REFRESH_SECRET ?? process.env.JWT_SECRET,
        expiresIn: '7d',
      },
    );

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        birthdate: user.birthdate.toISOString().split('T')[0],
      },
    };
  }

  async register(data: RegisterDto) {
    const userAlreadyExists = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    const birthdate = new Date(data.birthdate);

    if (Number.isNaN(birthdate.getTime())) {
      throw new BadRequestException('Data de nascimento inválida');
    }

    if (userAlreadyExists) {
      throw new UnauthorizedException('Usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prismaService.user.create({
      data: {
        name: data.name,
        email: data.email,
        birthdate: birthdate,
        password: hashedPassword,
      },
    });

    return {
      message: 'Usuário registrado com sucesso',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        birthdate: user.birthdate.toISOString().split('T')[0],
      },
    };
  }

  async login(data: LoginDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const tokens = await this.generateTokens(user);

    return {
      message: 'Login realizado com sucesso',
      ...tokens,
    };
  }

  async refresh(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        email?: string;
      }>(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET ?? process.env.JWT_SECRET,
      });

      const user = await this.prismaService.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('Usuário não encontrado');
      }

      const tokens = await this.generateTokens(user);

      return {
        message: 'Token renovado com sucesso',
        ...tokens,
      };
    } catch {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }
  }
}
