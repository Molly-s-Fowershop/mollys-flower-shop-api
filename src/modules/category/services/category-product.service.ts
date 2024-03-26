import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryProductService {
  constructor(private readonly prisma: PrismaService) {}

  async findProductsByCategoryId(categoryId: number) {
    const products = await this.prisma.product.findMany({
      where: {
        categoryId,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        productDetails: {
          select: {
            id: true,
            price: true,
            stock: true,
            type: true,
          },
        },
        productOffers: {
          select: {
            offer: {
              select: {
                id: true,
                discountValue: true,
                startDate: true,
                endDate: true,
              },
            },
          },
        },
      },
    });

    return {
      data: products,
      meta: {
        count: products.length,
      },
    };
  }
}
