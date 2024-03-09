import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';

import { UpdateProductCategoryDto } from '@modules/product/dto';
import { ProductCategoryService } from '@modules/product/services';

@Controller('products/:productId/category')
export class ProductCategoryController {
  constructor(private productCategoryService: ProductCategoryService) {}

  @Patch()
  async update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: UpdateProductCategoryDto,
  ) {
    return await this.productCategoryService.update(productId, dto);
  }
}
