import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './controllers/product.controller';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
