import { Injectable } from '@nestjs/common';
import { UpdateProductCategoryDto } from '@modules/product/dto/update-product-category.dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { ProductService } from '@modules/product/services/product.service';
import { CategoryService } from '@/modules/category/services/category.service';

@Injectable()
export class ProductCategoryService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  async update(productId: number, dto: UpdateProductCategoryDto) {
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
