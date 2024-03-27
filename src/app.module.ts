import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { CartModule } from './modules/cart/cart.module';
import { OfferModule } from './modules/offer/offer.module';
import { NotificationModule } from './modules/notification/notification.module';
import { MediaModule } from './modules/media/media.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CategoryModule } from './modules/category/category.module';
import { SubcategoryModule } from './modules/subcategory/subcategory.module';
import { S3Module } from './modules/s3/s3.module';
import { TwilioModule } from 'nestjs-twilio';
import { PaymentModule } from './modules/payment/payment.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (cfg: ConfigService) => ({
        type: 'postgres',
        entities: [__dirname + '/src/entities/**/*.entity{.ts,.js}'],
        url: cfg.getOrThrow('DATABASE_URL'),
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
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
    PrismaModule,
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    OrderModule,
    CartModule,
    OfferModule,
    NotificationModule,
    MediaModule,
    WishlistModule,
    SubcategoryModule,
    S3Module,
    PaymentModule,
  ],
})
export class AppModule {}
