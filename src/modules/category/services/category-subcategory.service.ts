import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CreateCategorySubcategoryDto,
  MutateCategorySubcategoryDto,
} from '../dto';
import { SubcategoryService } from '@/modules/subcategory/services/subcategory.service';

@Injectable()
export class CategorySubcategoryService {
  constructor(
    private prisma: PrismaService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
  ) {}

  async findAll(categoryId: number) {
    await this.categoryService.findOne(categoryId);

    const subcategories = await this.prisma.subcategory.findMany({
      where: {
        categoryId,
      },
    });

    return {
      data: subcategories,
      meta: {
        count: subcategories.length,
      },
    };
  }

  async findOne(categoryId: number, subcategoryId: number) {
    await this.categoryService.findOne(categoryId);

    const subcategory = await this.subcategoryService.findOne(subcategoryId);

    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }

    return subcategory;
  }

  async create(categoryId: number, dto: CreateCategorySubcategoryDto) {
    await this.categoryService.findOne(categoryId);

    await this.prisma.subcategory.createMany({
      data: dto.subcategories.map((subcategory) => ({
        ...subcategory,
        categoryId,
      })),
      skipDuplicates: true,
    });

    return await this.getSubcategories(categoryId);
  }

  // ! Maybe this method will be deleted in future. Need to check with the client
  async update(categoryId: number, dto: MutateCategorySubcategoryDto) {
    await this.categoryService.findOne(categoryId);

    try {
      await this.prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          subcategories: {
            connect: dto.subcategoryIds.map((id) => ({ id })),
          },
        },
      });
    } catch (err) {
      throw new NotFoundException('Subcategories not found');
    }

    return await this.getSubcategories(categoryId);
  }

  async remove(categoryId: number, dto: MutateCategorySubcategoryDto) {
    await this.categoryService.findOne(categoryId);

    await this.prisma.subcategory.deleteMany({
      where: {
        id: {
          in: dto.subcategoryIds,
        },
      },
    });

    return await this.getSubcategories(categoryId);
  }

  async getSubcategories(categoryId: number) {
    const { subcategories } = await this.categoryService.findOne(categoryId);

    return {
      data: subcategories,
    };
  }
}
