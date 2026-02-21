import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginDto, RegisterDto } from './dtos/auth';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

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

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
    });

    return {
      message: 'Login realizado com sucesso',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        birthdate: user.birthdate.toISOString().split('T')[0],
      },
      accessToken,
    };
  }
}
