import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  User,
  Product,
  Cart,
  Offer,
  Notification,
  Media,
  Category,
  Subcategory,
  Wishlist,
  Address,
  BroadcastNotification,
  CartItem,
  Order,
  OrderItem,
  DeliveryDetails,
  ProductDetails,
  ProductOffer,
  CategoryOffer,
  CouponCodeUse,
  UserNotification,
  WishlistItem,
  Customization,
  CustomizationGroup,
  CouponCode,
} from '@/db/entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        entities: [__dirname + '/src/db/entities/**/*.entity{.ts,.js}'],
        url: cfg.getOrThrow('DATABASE_URL'),
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      User,
      Product,
      Order,
      Cart,
      Offer,
      Notification,
      Media,
      Category,
      Subcategory,
      Wishlist,
      Address,
      BroadcastNotification,
      CartItem,
      OrderItem,
      DeliveryDetails,
      ProductDetails,
      ProductOffer,
      CategoryOffer,
      CouponCode,
      CouponCodeUse,
      UserNotification,
      WishlistItem,
      Customization,
      CustomizationGroup,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class OrmModule {}
