import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SubcategoryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const subcategories = await this.prisma.subcategory.findMany();

    return {
      data: subcategories,
      meta: {
        count: subcategories.length,
      },
    };
  }

  async findOne(subcategoryId: number) {
    const subcategory = await this.prisma.subcategory.findUnique({
      where: {
        id: subcategoryId,
      },
    });

    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }

    return subcategory;
  }
}
