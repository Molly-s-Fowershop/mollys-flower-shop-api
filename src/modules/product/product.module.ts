import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { CategoryModule } from '../category/category.module';
import { ProductCategoryController } from './controllers/product-category.controller';
import { ProductService, ProductCategoryService } from './services';

@Module({
  imports: [CategoryModule],
  controllers: [ProductController, ProductCategoryController],
  providers: [ProductService, ProductCategoryService],
})
export class ProductModule {}
