import { Module } from '@nestjs/common';
import { CategoryController } from '@modules/category/controllers/category.controller';
import { CategoryService } from './services/category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
