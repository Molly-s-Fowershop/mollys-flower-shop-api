import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '@modules/product/dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { CategoryService } from '@/modules/category/services/category.service';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService,
  ) {}
  async findAll() {
    const products = await this.prisma.product.findMany({
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

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        subcategories: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async create(dto: CreateProductDto) {
    const { categoryId, ...rest } = dto;
    await this.categoryService.findOne(categoryId);

    return await this.prisma.product.create({
      data: {
        ...rest,
        category: {
          connect: {
            id: dto.categoryId,
          },
        },
        productDetails: {
          create: {
            ...dto.productDetails,
          },
        },
      },
      include: {
        category: true,
        productDetails: true,
      },
    });
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id);

    return await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
      include: {
        category: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
