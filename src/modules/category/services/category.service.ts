import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '@modules/category/dto';
import { Category, OrderItem } from '@/entities';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
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
    const categoryIds: number[] = await this.orderItemRepository
      .createQueryBuilder('orderItem')
      .leftJoinAndSelect('orderItem.product', 'product')
      .leftJoinAndSelect('product.category', 'category')
      .select('category.id')
      .addSelect('COUNT(category.id)', 'count')
      .groupBy('category.id')
      .orderBy('count', 'DESC')
      .getRawMany();

    const mostPopularCategories = await this.categoryRepository.findBy({
      id: In(categoryIds),
    });

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
    const category = await this.categoryRepository.save(dto);

    return category;
  }

  async update(categoryId: number, dto: UpdateCategoryDto) {
    await this.findOne(categoryId);
    await this.categoryRepository.update(categoryId, dto);

    return this.findOne(categoryId);
  }

  async remove(categoryId: number) {
    await this.findOne(categoryId);
    await this.categoryRepository.delete(categoryId);
  }
}
