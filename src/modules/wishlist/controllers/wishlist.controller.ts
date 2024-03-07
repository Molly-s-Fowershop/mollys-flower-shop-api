import { JwtGuard } from '@/modules/auth/guard';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from '@/modules/auth/decorator';
import { User } from '@prisma/client';
import { UpdateWishlistDto } from '../dto/update-wishlist.dto';
import { WishlistService } from '../services/wishlist.service';

@UseGuards(JwtGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}

  @Get('/')
  get(@GetUser('id') userId: number) {
    return this.wishlistService.get(userId);
  }

  @Patch('/')
  updateItem(@GetUser() user: User, @Body() dto: UpdateWishlistDto) {
    return this.wishlistService.updateItem(user, dto);
  }
}
