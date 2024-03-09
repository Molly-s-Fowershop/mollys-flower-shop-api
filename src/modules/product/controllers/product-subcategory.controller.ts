import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ProductSubcategoryService } from '@modules/product/services/product-subcategory.service';
import { MutateProductSubcategoryDto } from '../dto';

@Controller('products/:productId/subcategories')
export class ProductSubcategoryController {
  constructor(private productSubcategoryService: ProductSubcategoryService) {}

  @Patch()
  update(
    @Body() dto: MutateProductSubcategoryDto,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.productSubcategoryService.update(productId, dto);
  }

  @Delete()
  remove(
    @Body() dto: MutateProductSubcategoryDto,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    return this.productSubcategoryService.remove(productId, dto);
  }
}
