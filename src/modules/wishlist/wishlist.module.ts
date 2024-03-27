import { Module } from '@nestjs/common';
import { WishlistController } from './controllers';
import { WishlistService } from './services';
import { OrmModule } from '@modules/orm/orm.module';

@Module({
  controllers: [WishlistController, OrmModule],
  providers: [WishlistService],
})
export class WishlistModule {}
