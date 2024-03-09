import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { CategoryModule } from '../category/category.module';
import { ProductCategoryController } from './controllers/product-category.controller';
import {
  ProductService,
  ProductCategoryService,
  ProductSubcategoryService,
} from './services';
import { ProductSubcategoryController } from './controllers/product-subcategory.controller';

@Module({
  imports: [CategoryModule],
  controllers: [
    ProductController,
    ProductCategoryController,
    ProductSubcategoryController,
  ],
  providers: [
    ProductService,
    ProductCategoryService,
    ProductSubcategoryService,
  ],
})
export class ProductModule {}
