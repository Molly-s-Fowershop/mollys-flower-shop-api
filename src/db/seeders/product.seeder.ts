import { Seeder } from '@jorgebodega/typeorm-seeding';
import { Product, ProductDetails } from '@/db/entities';
import { DataSource } from 'typeorm';

export default class ProductSeeder extends Seeder {
  async run(dataSource: DataSource) {
    const productsData: Partial<Product>[] = [
      {
        name: 'Roses',
        description: 'Beautiful red roses bouquet',
        categoryId: 1,
      },
      {
        name: 'Sunflowers',
        description: 'Cheerful yellow sunflowers arrangement',
        categoryId: 1,
      },
      {
        name: 'Orchids',
        description: 'Exotic purple orchids in a vase',
        categoryId: 1,
      },
      {
        name: 'Lily Bouquet',
        description: 'Fragrant white lilies bouquet',
        categoryId: 1,
      },
      {
        name: 'Mixed Bouquet',
        description: 'Colorful mixed flowers arrangement',
        categoryId: 1,
      },
      {
        name: 'Potted Succulents',
        description: 'Set of small succulents in pots',
        categoryId: 2,
      },
      {
        name: 'Bonsai Tree',
        description: 'Miniature bonsai tree for home decor',
        categoryId: 2,
      },
      {
        name: 'Bamboo Plant',
        description: 'Lucky bamboo plant in a decorative pot',
        categoryId: 2,
      },
      {
        name: 'Ferns',
        description: 'Green ferns for indoor gardening',
        categoryId: 2,
      },
      {
        name: 'Money Plant',
        description: 'Feng shui money plant for prosperity',
        categoryId: 2,
      },
    ];

    const productDetailsData: Partial<ProductDetails>[] = [
      {
        price: 12.99,
        stock: 100,
        limitPerDay: 5,
        type: 'STANDARD',
        productId: 1,
      },
      {
        price: 14.99,
        stock: 100,
        limitPerDay: 5,
        type: 'STANDARD',
        productId: 2,
      },
      {
        price: 16.99,
        stock: 100,
        limitPerDay: 5,
        type: 'STANDARD',
        productId: 3,
      },
    ];

    const productDetails = productDetailsData.map(
      (productDetail) => new ProductDetails(productDetail),
    );
    const products = productsData.map((product) => new Product(product));

    const em = dataSource.createEntityManager();

    await em.save<Product>(products);
    await em.save<ProductDetails>(productDetails);
  }
}
