import { Category } from '@/db/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeedCategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async seed() {
    await this.seedCategories();
  }

  async seedCategories() {
    await this.deleteAllCategories();

    const categories: Category[] = [
      new Category({
        name: 'Romantic Bouquets',
        description:
          'Explore our collection of romantic bouquets that are perfect for expressing love and affection. Each bouquet is carefully crafted with vibrant colors and exquisite blooms to create a memorable and heartfelt gift for your special someone.',
      }),
      new Category({
        name: 'Bright and Cheerful Arrangements',
        description:
          'Bring a smile to any occasion with our bright and cheerful flower arrangements. These arrangements feature a mix of colorful blooms that radiate positivity and joy, making them ideal for celebrations, birthdays, or simply brightening up someone’s day.',
      }),
      new Category({
        name: 'Elegant Lily Collection',
        description:
          'Discover the timeless beauty of lilies with our elegant Lily Collection. These bouquets and arrangements showcase the grace and sophistication of lilies, making them a perfect choice for elegant events, anniversaries, or as a sophisticated gift for a loved one.',
      }),
      new Category({
        name: 'Exotic Orchid Delights',
        description:
          'Indulge in the exotic beauty of orchids with our Orchid Delights collection. These plants and arrangements feature stunning orchids in a variety of colors, adding a touch of luxury and intrigue to any space. Perfect for those who appreciate the unique and extraordinary.',
      }),
      new Category({
        name: 'Colorful Mixed Flower Creations',
        description:
          'Experience the beauty of nature’s palette with our Colorful Mixed Flower Creations. These arrangements showcase a harmonious blend of flowers in vibrant colors, creating stunning displays that capture the essence of joy and celebration.',
      }),
    ];

    await this.categoryRepository.save(categories);
  }

  async deleteAllCategories() {
    const categories = await this.categoryRepository.find();

    await this.categoryRepository.remove(categories);
  }
}
