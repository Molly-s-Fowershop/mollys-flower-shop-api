import { Injectable } from '@nestjs/common';
import { UpdateProductCategoryDto } from '@modules/product/dto/update-product-category.dto';
import { ProductService } from '@modules/product/services/product.service';
import { CategoryService } from '@/modules/category/services/category.service';
import { Product } from '@/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  async update(productId: number, dto: UpdateProductCategoryDto) {
    await this.productService.findOne(productId);
    await this.categoryService.findOne(dto.categoryId);

    await this.productRepository
      .createQueryBuilder()
      .relation(Product, 'categories')
      .of(productId)
      .add(dto.categoryId);

    return this.productService.findOne(productId);
  }
}
