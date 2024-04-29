import { Media, Product, ProductDetails } from '@/db/entities';
import { ISeeder } from '@/modules/seed/interfaces/ISeeder';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeedProductService implements ISeeder {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductDetails)
    private readonly productDetailsRepository: Repository<ProductDetails>,
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async seed() {
    await this.seedProducts();
  }

  private async seedProducts() {
    await this.deleteAllProducts();

    const profileImages = await this.seedImages();

    const products: Product[] = [
      new Product({
        name: 'Vibrant Red Rose Bouquet',
        description:
          'A stunning bouquet of vibrant red roses, perfect for expressing love and passion. Each rose is carefully selected for its beauty and freshness, making it a delightful gift for any occasion. The rich red color of the roses symbolizes deep emotions and heartfelt sentiments, while their exquisite fragrance fills the air with romance and elegance. This bouquet is sure to capture the attention and admiration of anyone who receives it, leaving a lasting impression of beauty and love.',
        profileImage: profileImages[0],
        medias: await this.seedMedias(),
        categoryId: 1,
      }),
      new Product({
        name: 'Sun-Kissed Sunflower Arrangement',
        description:
          "Brighten up any space with this sun-kissed sunflower arrangement. These cheerful flowers bring warmth and happiness, making them a wonderful addition to your home or as a thoughtful gift. The golden petals of the sunflowers reflect the warmth of the sun, radiating positivity and joy. This arrangement also includes lush greenery that complements the sunflowers, creating a harmonious and uplifting display. Whether it's to brighten someone's day or to add a touch of sunshine to your space, this sunflower arrangement is a delightful choice.",
        profileImage: profileImages[1],
        medias: await this.seedMedias(),
        categoryId: 2,
      }),
      new Product({
        name: 'Elegant White Lily Bouquet',
        description:
          'An elegant bouquet of white lilies symbolizing purity and beauty. Each lily in this arrangement exudes grace and sophistication, making it a timeless choice for special occasions. The pristine white petals of the lilies convey purity and innocence, while their subtle fragrance adds a touch of luxury to any setting. This bouquet is expertly crafted to showcase the natural beauty of lilies, creating a stunning visual impact that is sure to be appreciated. Whether as a gift or as a centerpiece for an event, this elegant white lily bouquet is a symbol of refined beauty.',
        profileImage: profileImages[2],
        medias: await this.seedMedias(),
        categoryId: 1,
      }),
      new Product({
        name: 'Delicate Pink Orchid Plant',
        description:
          'Add a touch of exotic beauty with this delicate pink orchid plant. Known for their elegance and charm, orchids make a lasting impression and are easy to care for, making them an ideal gift. The soft pink hue of the orchid blooms symbolizes grace and femininity, while the intricate patterns on the petals add a sense of allure. This plant comes in a stylish pot, enhancing its aesthetic appeal and making it a versatile decorative piece for any space. Whether as a gift for a loved one or as a decorative accent for your home, this pink orchid plant is sure to captivate with its beauty.',
        profileImage: profileImages[3],
        medias: await this.seedMedias(),
        categoryId: 4,
      }),
      new Product({
        name: 'Colorful Mixed Flower Basket',
        description:
          'A colorful mix of flowers arranged in a beautiful basket, perfect for brightening up any space. This vibrant arrangement is a celebration of nature’s beauty and makes a thoughtful gift for any occasion. The basket contains an assortment of blooms in various colors, each symbolizing different emotions and sentiments. From the fiery reds to the serene blues, every flower adds its unique charm to the arrangement. The lush greenery and decorative accents enhance the visual appeal, creating a stunning display that brings joy and positivity wherever it is placed. Whether as a centerpiece or a gift for a loved one, this colorful mixed flower basket is sure to delight.',
        profileImage: profileImages[4],
        medias: await this.seedMedias(),
        categoryId: 5,
      }),
      new Product({
        name: 'Exquisite Purple Tulip Bouquet',
        description:
          'An exquisite bouquet of purple tulips symbolizing royalty and admiration. These beautiful tulips are sure to impress and convey heartfelt sentiments on special occasions. The deep purple hue of the tulips represents royalty and elegance, making them a striking choice for gifting. Each tulip is carefully selected for its freshness and beauty, ensuring a long-lasting and visually stunning bouquet. Whether as a gesture of admiration or as a token of appreciation, this exquisite purple tulip bouquet is a meaningful and elegant choice.',
        profileImage: profileImages[5],
        medias: await this.seedMedias(),
        categoryId: 3,
      }),
      new Product({
        name: 'Fragrant Carnation Garden',
        description:
          'Create a fragrant garden with this charming assortment of carnations. Known for their sweet scent and vibrant colors, carnations are a classic choice for expressing love and appreciation. This garden-style arrangement features a mix of colorful carnations, each symbolizing different emotions and sentiments. From the cheerful yellows to the passionate reds, every carnation adds its unique charm to the garden. The fragrant blooms fill the air with a delightful scent, creating a sensory experience that uplifts the mood. Whether as a gift for a special occasion or as a way to brighten up your space, this fragrant carnation garden is sure to leave a lasting impression.',
        profileImage: profileImages[6],
        medias: await this.seedMedias(),
        categoryId: 2,
      }),
      new Product({
        name: 'Dazzling Daisy Bouquet',
        description:
          'A dazzling bouquet of daisies in cheerful colors, perfect for brightening up any day. These joyful flowers are a symbol of innocence and happiness, making them a delightful gift for all occasions. The vibrant colors of the daisies bring a sense of joy and positivity, while their simple yet charming appearance adds a touch of whimsy. This bouquet is expertly arranged to showcase the beauty of daisies, creating a visually stunning display that captures the essence of springtime. Whether as a gift for a loved one or as a treat for yourself, this dazzling daisy bouquet is sure to bring a smile to anyone’s face.',
        profileImage: profileImages[7],
        medias: await this.seedMedias(),
        categoryId: 2,
      }),
    ];

    await this.productRepository.save(products);
    await this.seedProductDetails();
  }

  private async seedProductDetails() {
    const products = await this.productRepository.find();

    const productDetails: ProductDetails[] = [
      new ProductDetails({
        productId: products[0].id,
        price: 49.99,
        stock: 50,
      }),
      new ProductDetails({
        productId: products[1].id,
        price: 29.99,
        stock: 30,
      }),
      new ProductDetails({
        productId: products[2].id,
        price: 39.99,
        stock: 40,
      }),
      new ProductDetails({
        productId: products[3].id,
        price: 59.99,
        stock: 25,
      }),
      new ProductDetails({
        productId: products[4].id,
        price: 19.99,
        stock: 60,
      }),
      new ProductDetails({
        productId: products[5].id,
        price: 69.99,
        stock: 15,
      }),
      new ProductDetails({
        productId: products[6].id,
        price: 79.99,
        stock: 20,
      }),
      new ProductDetails({
        productId: products[7].id,
        price: 99.99,
        stock: 10,
      }),
    ];

    return this.productDetailsRepository.save(productDetails);
  }

  private async seedImages() {
    const profileImages: Media[] = [
      new Media({
        url: 'https://images.pexels.com/photos/42257/flowerful-flowery-flowerly-42257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        s3Name: 'flowerful-flowery-flowerly-42257.jpeg',
        type: 'image',
        context: 'product',
      }),
      new Media({
        url: 'https://images.pexels.com/photos/931158/pexels-photo-931158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        s3Name: 'rose-roses-flowers-red-159306.jpeg',
        type: 'image',
        context: 'product',
      }),
      new Media({
        url: 'https://images.pexels.com/photos/2831040/pexels-photo-2831040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        s3Name: 'pexels-photo-1043472.jpeg',
        type: 'image',
        context: 'product',
      }),
      new Media({
        url: 'https://images.pexels.com/photos/14401/pexels-photo-14401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        s3Name: 'pexels-photo-145685.jpeg',
        type: 'image',
        context: 'product',
      }),
      new Media({
        url: 'https://images.pexels.com/photos/2879819/pexels-photo-2879819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        s3Name: 'flowerful-flowery-flowerly-42257.jpeg',
        type: 'image',
        context: 'product',
      }),
      new Media({
        url: 'https://images.pexels.com/photos/931168/pexels-photo-931168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        s3Name: 'flowerful-flowery-flowerly-42257.jpeg',
        type: 'image',
        context: 'product',
      }),
      new Media({
        url: 'https://images.pexels.com/photos/931171/pexels-photo-931171.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        s3Name: 'rose-roses-flowers-red-159306.jpeg',
        type: 'image',
        context: 'product',
      }),
      new Media({
        url: 'https://images.pexels.com/photos/4207475/pexels-photo-4207475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        s3Name: 'pexels-photo-1043472.jpeg',
        type: 'image',
        context: 'product',
      }),
    ];

    return await this.mediaRepository.save(profileImages);
  }

  private async seedMedias() {
    const medias: Media[] = [
      new Media({
        url: 'https://images.pexels.com/photos/2791043/pexels-photo-2791043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        s3Name: 'flowerful-flowery-flowerly-42257.jpeg',
        type: 'image',
        context: 'product',
      }),
      new Media({
        url: 'https://images.pexels.com/photos/3782745/pexels-photo-3782745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        s3Name: 'rose-roses-flowers-red-159306.jpeg',
        type: 'image',
        context: 'product',
      }),
      new Media({
        url: 'https://images.pexels.com/photos/4622882/pexels-photo-4622882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        s3Name: 'pexels-photo-1043472.jpeg',
        type: 'image',
        context: 'product',
      }),
      new Media({
        url: 'https://images.pexels.com/photos/7473647/pexels-photo-7473647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        s3Name: 'pexels-photo-145685.jpeg',
        type: 'image',
        context: 'product',
      }),
      new Media({
        url: 'https://images.pexels.com/photos/3782750/pexels-photo-3782750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        s3Name: 'flowerful-flowery-flowerly-42257.jpeg',
        type: 'image',
        context: 'product',
      }),
      new Media({
        url: 'https://images.pexels.com/photos/931180/pexels-photo-931180.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        s3Name: 'flowerful-flowery-flowerly-42257.jpeg',
        type: 'image',
        context: 'product',
      }),
      new Media({
        url: 'https://images.pexels.com/photos/11116394/pexels-photo-11116394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        s3Name: 'rose-roses-flowers-red-159306.jpeg',
        type: 'image',
        context: 'product',
      }),
    ];

    return await this.mediaRepository.save(medias);
  }

  private async deleteAllProducts() {
    const mediaIds = (await this.mediaRepository.find()).map(
      (media) => media.id,
    );

    const productIds = (await this.productRepository.find()).map(
      (product) => product.id,
    );

    const productDetailsIds = (await this.productDetailsRepository.find()).map(
      (productDetais) => productDetais.id,
    );

    const profileImageIds = (await this.productRepository.find()).map(
      (product) => product.profileImageId,
    );

    mediaIds.filter((mediaId) => !productIds.includes(mediaId)).length &&
      (await this.mediaRepository.delete(
        mediaIds.filter((mediaId) => !productIds.includes(mediaId)),
      ));

    productDetailsIds.length &&
      (await this.productDetailsRepository.delete(productDetailsIds));

    productIds.length && (await this.productRepository.delete(productIds));

    profileImageIds.length &&
      (await this.mediaRepository.delete(profileImageIds));
  }
}
