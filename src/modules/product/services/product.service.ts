import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '@modules/product/dto';
import { CategoryService } from '@/modules/category/services/category.service';
import { Order, OrderItem, Product, ProductDetails } from '@/entities';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  FilterSuffix,
  paginate,
  type PaginateQuery,
} from 'nestjs-paginate';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductDetails)
    private readonly productDetailsRepository: Repository<ProductDetails>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private categoryService: CategoryService,
  ) {}

  async findAll(query: PaginateQuery) {
    return paginate(query, this.productRepository, {
      relations: ['category', 'productDetails', 'productOffers'],
      sortableColumns: ['id', 'name', 'productDetails.price', 'createdAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      searchableColumns: ['name', 'description'],
      loadEagerRelations: true,
      filterableColumns: {
        name: [FilterOperator.EQ, FilterSuffix.NOT],
        'productDetails.price': [FilterOperator.EQ, FilterOperator.GT],
        'productDetails.type': [FilterOperator.EQ, FilterSuffix.NOT],
        'category.name': [FilterOperator.EQ, FilterSuffix.NOT],
        'category.id': [FilterOperator.EQ],
      },
    });
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
    const productIds = await this.orderItemRepository
      .createQueryBuilder('orderItem')
      .select('orderItem.productId')
      .addSelect('COUNT(orderItem.productId)', 'count')
      .groupBy('orderItem.productId')
      .orderBy('COUNT(orderItem.productId)', 'DESC')
      .select('orderItem.productId')
      .limit(8)
      .getRawMany();

    const mostPopularProducts = await this.productRepository.find({
      where: {
        id: In(productIds.map((item) => item['orderItem_productId'])),
      },
      relations: ['category', 'productDetails', 'productOffers'],
    });

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

    const product = await this.productRepository.save(rest);
    const productDetails = await this.productDetailsRepository.save(details);

    await this.productRepository
      .createQueryBuilder()
      .relation(Product, 'category')
      .of(product)
      .set(categoryId);

    await this.productRepository
      .createQueryBuilder()
      .relation(Product, 'productDetails')
      .of(product)
      .set(productDetails);

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
