import { JwtGuard } from '@/modules/auth/guard';
import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { GetUser } from '@/modules/auth/decorator';
import { User } from '@prisma/client';
import { UpdateWishlistDto } from '../dto/update-wishlist.dto';
import { WishlistService } from '../services/wishlist.service';

@UseGuards(JwtGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get('/')
  get() {
    return 'This action returns all wishlist items';
  }

  @Post('/')
  addItem(@GetUser() user: User, @Body() dto: UpdateWishlistDto) {
    return this.wishlistService.addItem(user, dto);
  }

  @Patch('/item/:id')
  removeItem() {
    return 'This action updates a wishlist item';
  }
}
