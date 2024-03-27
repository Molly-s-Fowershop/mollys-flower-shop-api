import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '@modules/category/dto';
import { Category } from '@/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    const categories = await this.categoryRepository.find();

    return {
      data: categories,
      meta: {
        count: categories.length,
      },
    };
  }

  async findPopular() {
    const mostPopularCategories = await this.categoryRepository
      .createQueryBuilder('category')
      .select([
        'category.id',
        'category.name',
        'category.description',
        'COUNT(orderItem.id) AS totalSales',
      ])
      .leftJoin('category.products', 'product')
      .leftJoin('product.orderItems', 'orderItem')
      .groupBy('category.id')
      .orderBy('totalSales', 'DESC')
      .limit(8)
      .getRawMany();

    return {
      data: mostPopularCategories,
      meta: {
        count: mostPopularCategories.length,
      },
    };
  }

  async findOne(categoryId: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['products', 'subcategories'],
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async create(dto: CreateCategoryDto) {
    return this.categoryRepository.create(dto);
  }

  async update(categoryId: number, dto: UpdateCategoryDto) {
    await this.findOne(categoryId);

    return this.categoryRepository.update(categoryId, dto);
  }

  async remove(categoryId: number) {
    await this.findOne(categoryId);

    return this.categoryRepository.delete(categoryId);
  }
}
