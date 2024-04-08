import { DataSource } from 'typeorm';
import { Category } from '@/db/entities';
import { Seeder } from '@jorgebodega/typeorm-seeding';

export default class CategorySeeder extends Seeder {
  async run(dataSource: DataSource) {
    const categoriesData = [
      {
        name: 'Flowers',
        description: 'Beautiful flowers for all occasions',
      },
      {
        name: 'Plants',
        description: 'Low-maintenance plants for your home',
      },
    ];

    const categories = categoriesData.map((category) => new Category(category));

    await dataSource.createEntityManager().save<Category>(categories);
  }
}
