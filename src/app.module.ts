import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { CartModule } from './modules/cart/cart.module';
import { OfferModule } from './modules/offer/offer.module';
import { NotificationModule } from './modules/notification/notification.module';
import { MediaModule } from './modules/media/media.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    OrderModule,
    CartModule,
    OfferModule,
    NotificationModule,
    MediaModule,
    AuthModule,
  ],
})
export class AppModule {}
