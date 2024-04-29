import { Injectable } from '@nestjs/common';
import { SeedProductService } from './seed-product.service';
import { SeedCategoryService } from './seed-category.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly seedProductService: SeedProductService,
    private readonly seedCategoryService: SeedCategoryService,
  ) {}

  async seed() {
    await this.seedCategoryService.seed();

    await this.seedProductService.seed();
  }
}
