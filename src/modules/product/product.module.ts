import { Module } from '@nestjs/common';
import { CategoryModule } from '@/modules/category/category.module';
import { MediaModule } from '@/modules/media/media.module';
import {
  ProductController,
  ProductCategoryController,
  ProductSubcategoryController,
  ProductMediaController,
} from './controllers';
import {
  ProductService,
  ProductCategoryService,
  ProductSubcategoryService,
  ProductMediaService,
} from './services';

@Module({
  imports: [CategoryModule, MediaModule],
  controllers: [
    ProductController,
    ProductCategoryController,
    ProductSubcategoryController,
    ProductMediaController,
  ],
  providers: [
    ProductService,
    ProductCategoryService,
    ProductSubcategoryService,
    ProductMediaService,
  ],
})
export class ProductModule {}
