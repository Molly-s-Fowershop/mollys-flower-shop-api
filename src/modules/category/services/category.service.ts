import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '@modules/category/dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const categories = await this.prisma.category.findMany();

    return {
      data: categories,
      meta: {
        count: categories.length,
      },
    };
  }

  async findPopular() {
    const mostPopularProducts = await this.prisma.product.findMany({
      select: {
        category: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        orderItem: {
          _count: Prisma.SortOrder.desc,
        },
      },
    });

    const categoryIds = mostPopularProducts.map(
      (product) => product.category.id,
    );

    const categories = await this.prisma.category.findMany({
      where: {
        id: {
          in: categoryIds,
        },
      },
    });

    return {
      data: categories,
      meta: {
        count: categories.length,
      },
    };
  }

  // async findPopular() {
  //   const mostPopularCategories = (await this.prisma.$queryRaw`
  //     SELECT c.id, c.name, c.description, COUNT(oi.id) AS totalSales
  //     FROM "Category" c
  //     JOIN "Product" p ON c.id = p."categoryId"
  //     JOIN "OrderItem" oi ON p.id = oi."productId"
  //     GROUP BY c.id
  //     ORDER BY totalSales DESC
  //     LIMIT ${8};
  //   `) as any[];

  //   return {
  //     data: mostPopularCategories,
  //     meta: {
  //       count: mostPopularCategories.length,
  //     },
  //   };
  // }

  async findOne(categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
      include: {
        subcategories: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async create(dto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: dto,
    });
  }

  async update(categoryId: number, dto: UpdateCategoryDto) {
    await this.findOne(categoryId);

    return this.prisma.category.update({
      where: { id: categoryId },
      data: dto,
    });
  }

  async remove(categoryId: number) {
    await this.findOne(categoryId);

    return this.prisma.category.delete({
      where: { id: categoryId },
    });
  }
}
