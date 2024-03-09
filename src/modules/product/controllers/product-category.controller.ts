import { PrismaService } from '@/modules/prisma/prisma.service';
import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ProductService } from '@modules/product/services/product.service';
import { UpdateProductCategoryDto } from '@modules/product/dto/update-product-category.dto';
import { CategoryService } from '@/modules/category/services/category.service';

@Controller('products/:productId/category')
export class ProductCategoryController {
  constructor(
    private prisma: PrismaService,
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  @Patch()
  async update(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: UpdateProductCategoryDto,
  ) {
    await this.productService.findOne(productId);
    await this.categoryService.findOne(dto.categoryId);

    return await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        category: {
          connect: {
            id: dto.categoryId,
          },
        },
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}
