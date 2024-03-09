import { PrismaService } from '@/modules/prisma/prisma.service';
import { ProductService } from '@/modules/product/services';
import { MutateProductSubcategoryDto } from '@modules/product/dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductSubcategoryService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductService,
  ) {}

  async update(productId: number, dto: MutateProductSubcategoryDto) {
    await this.productService.findOne(productId);

    try {
      await this.prisma.product.update({
        where: { id: productId },
        data: {
          subcategories: {
            set: dto.subcategoryIds.map((id) => ({ id })),
          },
        },
      });
    } catch (error) {
      throw new NotFoundException('Subcategories not found');
    }

    return this.getSubcategories(productId);
  }

  async remove(productId: number, dto: MutateProductSubcategoryDto) {
    await this.productService.findOne(productId);

    await this.prisma.product.update({
      where: { id: productId },
      data: {
        subcategories: {
          disconnect: dto.subcategoryIds.map((id) => ({ id })),
        },
      },
    });

    return this.getSubcategories(productId);
  }

  async getSubcategories(productId: number) {
    const { subcategories } = await this.productService.findOne(productId);

    return subcategories;
  }
}
