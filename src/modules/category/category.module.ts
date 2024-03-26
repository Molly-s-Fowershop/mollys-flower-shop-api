import { Module } from '@nestjs/common';
import { SubcategoryService } from '@modules/subcategory/services/subcategory.service';
import {
  CategoryService,
  CategorySubcategoryService,
  CategoryProductService,
} from '@modules/category/services';
import {
  CategoryController,
  CategorySubcategoryController,
  CategoryProductController,
} from '@modules/category/controllers';

@Module({
  controllers: [
    CategoryController,
    CategorySubcategoryController,
    CategoryProductController,
  ],
  providers: [
    CategoryService,
    CategorySubcategoryService,
    CategoryProductService,
    SubcategoryService,
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
