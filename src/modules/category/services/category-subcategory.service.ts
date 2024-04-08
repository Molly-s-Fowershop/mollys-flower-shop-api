import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  CreateCategorySubcategoryDto,
  MutateCategorySubcategoryDto,
} from '../dto';
import { SubcategoryService } from '@/modules/subcategory/services/subcategory.service';
import { Category, Subcategory } from '@/db/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategorySubcategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
  ) {}

  async findAll(categoryId: number) {
    await this.categoryService.findOne(categoryId);

    const subcategories = await this.subcategoryRepository.findBy({
      category: {
        id: categoryId,
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
    const category = await this.categoryService.findOne(categoryId);

    const subcategories = await Promise.all(
      dto.subcategories.map((subcategory) => {
        return this.subcategoryRepository.save(subcategory);
      }),
    );

    category.subcategories.push(...subcategories);

    await this.categoryRepository.save(category);

    return await this.getSubcategories(categoryId);
  }

  // ! Maybe this method will be deleted in future. Need to check with the client
  async update(categoryId: number, dto: MutateCategorySubcategoryDto) {
    await this.categoryService.findOne(categoryId);

    try {
      await this.categoryRepository
        .createQueryBuilder()
        .relation(Category, 'subcategories')
        .of(categoryId)
        .add(dto.subcategoryIds);
    } catch (err) {
      throw new NotFoundException('Subcategories not found');
    }

    return await this.getSubcategories(categoryId);
  }

  async remove(categoryId: number, dto: MutateCategorySubcategoryDto) {
    await this.categoryService.findOne(categoryId);

    await this.categoryRepository
      .createQueryBuilder()
      .relation(Category, 'subcategories')
      .of(categoryId)
      .remove(dto.subcategoryIds);

    return await this.getSubcategories(categoryId);
  }

  async getSubcategories(categoryId: number) {
    const { subcategories } = await this.categoryService.findOne(categoryId);

    return {
      data: subcategories,
      meta: {
        count: subcategories.length,
      },
    };
  }
}
