import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  UpdateWishlistDto,
  WishlistUpdateType,
} from '@modules/wishlist/dto/update-wishlist.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, Wishlist, WishlistItem } from '@/entities';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    @InjectRepository(WishlistItem)
    private readonly wishlistItemRepository: Repository<WishlistItem>,
  ) {}

  async get(userId: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: {
        userId,
      },
      relations: ['items'],
    });

    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }

    return wishlist;
  }

  async updateItem(user: User, dto: UpdateWishlistDto) {
    const { productId } = dto;

    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const wishlist = await this.wishlistRepository.findOne({
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

    await this.wishlistItemRepository.create({
      productId: productId,
      wishlistId: wishlist.id,
    });

    return `This action adds a new wishlist item widh id ${dto.productId} to user ${user.id}`;
  }

  private async removeItem(
    user: User,
    dto: UpdateWishlistDto,
    wishlist: Wishlist,
  ) {
    const { productId } = dto;

    await this.wishlistItemRepository
      .createQueryBuilder()
      .delete()
      .from(WishlistItem)
      .where('productId = :productId', { productId })
      .andWhere('wishlistId = :wishlistId', { wishlistId: wishlist.id })
      .execute();

    return `This action removes a wishlist item widh id ${dto.productId} from user ${user.id}`;
  }
}
