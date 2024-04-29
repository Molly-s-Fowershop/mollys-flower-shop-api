import { Module } from '@nestjs/common';
import {
  SeedService,
  SeedProductService,
  SeedCategoryService,
} from './services';
import { SeedController } from './seed.controller';
import { OrmModule } from '@/modules/orm/orm.module';

@Module({
  imports: [OrmModule],
  providers: [SeedService, SeedProductService, SeedCategoryService],
  controllers: [SeedController],
})
export class SeedModule {}
