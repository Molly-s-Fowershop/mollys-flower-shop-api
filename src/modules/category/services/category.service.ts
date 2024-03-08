import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '@modules/category/dto';

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

  async findOne(categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error('Category not found');
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
