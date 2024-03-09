import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { CategoryModule } from '../category/category.module';
import { ProductCategoryController } from './controllers/product-category.controller';

@Module({
  imports: [CategoryModule],
  controllers: [ProductController, ProductCategoryController],
  providers: [ProductService],
})
export class ProductModule {}
