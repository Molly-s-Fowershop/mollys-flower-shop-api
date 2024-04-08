import { Injectable } from '@nestjs/common';
import { Category, Product } from '@/db/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryProductService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findProductsByCategoryId(categoryId: number) {
    const products = await this.productRepository.find({
      where: {
        category: {
          id: categoryId,
        },
      },
      relations: ['category', 'productDetails', 'productOffers'],
    });

    return {
      data: products,
      meta: {
        count: products.length,
      },
    };
  }
}
