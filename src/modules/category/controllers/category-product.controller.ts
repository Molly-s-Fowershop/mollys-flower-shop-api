import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CategoryProductService } from '../services/category-product.service';

@Controller('categories/:categoryId/products')
export class CategoryProductController {
  constructor(
    private readonly categoryProductService: CategoryProductService,
  ) {}

  @Get()
  findProductsByCategoryId(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.categoryProductService.findProductsByCategoryId(categoryId);
  }
}
