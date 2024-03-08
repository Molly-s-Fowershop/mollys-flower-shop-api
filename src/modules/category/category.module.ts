import { Module } from '@nestjs/common';
import { CategoryController } from '@modules/category/controllers/category.controller';

@Module({
  controllers: [CategoryController],
  providers: [],
})
export class CategoryModule {}
