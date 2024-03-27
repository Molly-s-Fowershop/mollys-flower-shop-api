import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '@modules/product/dto';
import { CategoryService } from '@/modules/category/services/category.service';
import { Product, ProductDetails } from '@/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private categoryService: CategoryService,
  ) {}

  async findAll() {
    const products = await this.productRepository.find({
      relations: ['category', 'productDetails', 'productOffers'],
    });

    return {
      data: products,
      meta: {
        count: products.length,
      },
    };
  }

  async findLatest() {
    const products = await this.productRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: ['category', 'productDetails', 'productOffers'],
      take: 8,
    });

    return {
      data: products,
      meta: {
        count: products.length,
      },
    };
  }

  async findPopular() {
    const mostPopularProducts = await this.productRepository
      .createQueryBuilder('product')
      .leftJoin('product.orderItems', 'orderItems')
      .groupBy('product.id')
      .orderBy('COUNT(orderItems.id)', 'DESC')
      .limit(8)
      .getMany();

    return {
      data: mostPopularProducts,
      meta: {
        count: mostPopularProducts.length,
      },
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {
        id,
      },
      relations: ['category', 'productDetails', 'productOffers'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async create(dto: CreateProductDto) {
    const { categoryId, productDetails: details, ...rest } = dto;
    await this.categoryService.findOne(categoryId);

    const product = new Product(rest);
    const productDetails = new ProductDetails(details);

    product.productDetails = productDetails;

    await this.productRepository.save(product);

    await this.productRepository
      .createQueryBuilder()
      .relation(Product, 'category')
      .of(product)
      .set(categoryId);

    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id);

    return await this.productRepository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.productRepository.delete(id);
  }
}
