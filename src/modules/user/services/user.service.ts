import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from '@modules/user/dto/update-user.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateUserEvent } from '@modules/user/events/create-user.event';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
    const cart = await this.prisma.cart.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    const wishlist = await this.prisma.wishlist.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    console.log(cart, wishlist);
  }
}
