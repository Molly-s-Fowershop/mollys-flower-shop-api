import { Module } from '@nestjs/common';
import { CategoryController } from '@modules/category/controllers/category.controller';
import { CategoryService } from './services/category.service';
import { CategorySubcategoryController } from './controllers/category-subcategory.controller';
import { CategorySubcategoryService } from './services/category-subcategory.service';
import { SubcategoryService } from '../subcategory/services/subcategory.service';

@Module({
  controllers: [CategoryController, CategorySubcategoryController],
  providers: [CategoryService, CategorySubcategoryService, SubcategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
