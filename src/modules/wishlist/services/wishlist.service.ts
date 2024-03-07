import { Injectable, NotFoundException } from '@nestjs/common';
import { User, Wishlist } from '@prisma/client';
import {
  UpdateWishlistDto,
  WishlistUpdateType,
} from '@modules/wishlist/dto/update-wishlist.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async get(userId: number) {
    const wishlist = await this.prisma.wishlist.findFirst({
      where: {
        userId,
      },
      include: {
        items: true,
      },
    });

    return wishlist;
  }

  async updateItem(user: User, dto: UpdateWishlistDto) {
    const { productId } = dto;

    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const wishlist = await this.prisma.wishlist.findFirst({
      where: {
        userId: user.id,
      },
    });

    switch (dto.type) {
      case WishlistUpdateType.Add:
        return this.addItem(user, dto, wishlist);
      case WishlistUpdateType.Remove:
        return this.removeItem(user, dto, wishlist);
      default:
        throw new Error('Invalid type');
    }
  }

  private async addItem(
    user: User,
    dto: UpdateWishlistDto,
    wishlist: Wishlist,
  ) {
    const { productId } = dto;

    await this.prisma.wishlistItem.create({
      data: {
        product: {
          connect: {
            id: productId,
          },
        },
        wishlist: {
          connect: {
            id: wishlist.id,
          },
        },
      },
    });

    return `This action adds a new wishlist item widh id ${dto.productId} to user ${user.id}`;
  }

  private async removeItem(
    user: User,
    dto: UpdateWishlistDto,
    wishlist: Wishlist,
  ) {
    const { productId } = dto;

    await this.prisma.wishlistItem.delete({
      where: {
        id: {
          wishlistId: wishlist.id,
          productId: productId,
        },
      },
    });

    return `This action removes a wishlist item widh id ${dto.productId} from user ${user.id}`;
  }
}
