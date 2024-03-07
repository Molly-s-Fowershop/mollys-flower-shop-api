import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UpdateWishlistDto } from '../dto/update-wishlist.dto';

@Injectable()
export class WishlistService {
  get() {
    return 'This action returns all wishlist items';
  }

  addItem(user: User, dto: UpdateWishlistDto) {
    return `This action adds a new wishlist item widh id ${dto.productId} to user ${user.id}`;
  }

  removeItem() {
    return 'This action updates a wishlist item';
  }
}
