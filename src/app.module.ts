import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TwilioModule } from 'nestjs-twilio';
import { OrmModule } from './modules/orm/orm.module';
import { S3Module } from './modules/s3/s3.module';
import { MediaModule } from './modules/media/media.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { PaymentModule } from './modules/payment/payment.module';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';
import { CategoryModule } from './modules/category/category.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { CartModule } from './modules/cart/cart.module';
import { OfferModule } from './modules/offer/offer.module';
import { NotificationModule } from './modules/notification/notification.module';
import { SeedModule } from './modules/seed/seed.module';

@Module({
  imports: [
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        accountSid: cfg.get('TWILIO_ACCOUNT_SID'),
        authToken: cfg.get('TWILIO_AUTH_TOKEN'),
      }),
      inject: [ConfigService],
      isGlobal: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    AuthModule,
    UserModule,
    OrmModule,
    MediaModule,
    S3Module,
    WishlistModule,
    PaymentModule,
    SubcategoryModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    CartModule,
    OfferModule,
    NotificationModule,
    SeedModule,
  ],
})
export class AppModule {}
