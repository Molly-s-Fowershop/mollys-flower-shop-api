import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '@modules/user/dto/update-user.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateUserDto } from '../dto/create-user.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateUserEvent } from '@modules/user/events/create-user.event';
import { NotificationService } from '@/modules/notification/services';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    private notificationService: NotificationService,
  ) {}

  async findAll() {
    const users = await this.prisma.user.findMany();

    return {
      data: users,
      meta: {
        count: users.length,
      },
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user)
      throw new NotFoundException('Note with provided id was not found');

    return user;
  }

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: dto,
    });

    this.eventEmitter.emit('user.created', new CreateUserEvent(user));

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user)
      throw new NotFoundException('Note with provided id was not found');

    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user)
      throw new NotFoundException('Note with provided id was not found');

    return await this.prisma.user.delete({
      where: { id },
    });
  }

  @OnEvent('user.created')
  async initialize({ user }: CreateUserEvent) {
    await this.prisma.cart.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    await this.prisma.wishlist.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    await this.notificationService.sendWelcomeNotifications(user);
  }
}
