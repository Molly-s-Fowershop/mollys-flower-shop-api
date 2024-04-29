import { MediaService } from '@/modules/media/services/media.service';
import { Injectable } from '@nestjs/common';
import { ProductService } from './product.service';
import { DeleteProductMediaDto } from '../dto/delete-product-media.dto';
import { Product } from '@/db/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductMediaService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private mediaService: MediaService,
    private productService: ProductService,
  ) {}

  async findProductMedias(productId: number) {
    await this.productService.findOne(productId);

    const { medias } = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['medias'],
    });

    return {
      data: medias,
      meta: {
        count: medias.length,
      },
    };
  }

  async createManyProductMedia(
    productId: number,
    files: Express.Multer.File[],
  ) {
    await this.productService.findOne(productId);

    const medias = await Promise.all(
      files.map((file) =>
        this.mediaService.create(
          {
            title: file.originalname,
            description: '',
          },
          file,
          'product',
        ),
      ),
    );

    await this.productRepository
      .createQueryBuilder()
      .relation(Product, 'medias')
      .of(productId)
      .add(medias);

    return await this.findProductMedias(productId);
  }

  async deleteProductMedia(productId: number, dto: DeleteProductMediaDto) {
    await this.productService.findOne(productId);

    const { mediaIds } = dto;

    await Promise.all(
      mediaIds.map(async (mediaId) => {
        await this.mediaService.delete(mediaId);
      }),
    );

    return await this.productRepository
      .createQueryBuilder()
      .relation(Product, 'medias')
      .of(productId)
      .remove(mediaIds);
  }
}
