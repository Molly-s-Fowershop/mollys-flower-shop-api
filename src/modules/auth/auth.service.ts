import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { omit } from 'rambda';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '@modules/prisma/prisma.service';
import { User } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateUserEvent } from '@modules/user/events/create-user.event';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async validateToken(user: User, token: string) {
    return { username: user.name, accessToken: token };
  }

  async register(dto: RegisterDto) {
    if (await this.prisma.user.findFirst({ where: { email: dto.email } }))
      throw new BadRequestException('This email is already taken');

    const hashedPassword = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...omit(['password'], dto),
          hashedPassword,
        },
      });
      this.eventEmitter.emit('user.created', new CreateUserEvent(user));

      delete user.hashedPassword;
      return this.signToken(user.id, user.email, user.name);
    } catch (err) {
      throw err;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Invalid identifier or password');

    const passwordValid = await argon.verify(user.hashedPassword, dto.password);

    if (!passwordValid)
      throw new ForbiddenException('Invalid identifier or password');

    return this.signToken(user.id, user.email, user.name);
  }

  async signToken(
    userId: string | number,
    email: string,
    name: string,
  ): Promise<{ accessToken: string; name: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      accessToken: token,
      name,
    };
  }
}
