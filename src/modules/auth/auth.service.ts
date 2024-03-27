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
import { UserService } from '../user/services';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/entities';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService,
    private userService: UserService,
  ) {}

  async validateToken(user: User, token: string) {
    return { username: user.name, accessToken: token };
  }

  async register(dto: RegisterDto) {
    if (await this.userRepository.findOne({ where: { email: dto.email } }))
      throw new BadRequestException('This email is already taken');

    const hashedPassword = await argon.hash(dto.password);

    try {
      const user = await this.userService.create({
        ...omit(['password'], dto),
        hashedPassword,
      });

      delete user.hashedPassword;
      return this.signToken(user.id, user.email, user.name);
    } catch (err) {
      throw err;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.userRepository.findOne({
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
