import { ProductService } from '@/modules/product/services';
import { MutateProductSubcategoryDto } from '@modules/product/dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, Subcategory } from '@/db/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductSubcategoryService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
    private productService: ProductService,
  ) {}

  async update(productId: number, dto: MutateProductSubcategoryDto) {
    await this.productService.findOne(productId);

    try {
      await this.productRepository
        .createQueryBuilder()
        .relation(Product, 'subcategories')
        .of(productId)
        .add(dto.subcategoryIds);
    } catch (error) {
      throw new NotFoundException('Subcategories not found');
    }

    return this.getSubcategories(productId);
  }

  async remove(productId: number, dto: MutateProductSubcategoryDto) {
    await this.productService.findOne(productId);

    try {
      await this.productRepository
        .createQueryBuilder()
        .relation(Product, 'subcategories')
        .of(productId)
        .remove(dto.subcategoryIds);
    } catch (error) {
      throw new NotFoundException('Subcategories not found');
    }

    return this.getSubcategories(productId);
  }

  async getSubcategories(productId: number) {
    const { subcategories } = await this.productService.findOne(productId);

    return subcategories;
  }
}
