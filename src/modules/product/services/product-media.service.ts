import { MediaService } from '@/modules/media/services/media.service';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProductService } from './product.service';
import { DeleteProductMediaDto } from '../dto/delete-product-media.dto';

@Injectable()
export class ProductMediaService {
  constructor(
    private prisma: PrismaService,
    private mediaService: MediaService,
    private productService: ProductService,
  ) {}

  async findProductMedias(productId: number) {
    await this.productService.findOne(productId);

    const { medias } = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        medias: true,
      },
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
          'PRODUCT',
        ),
      ),
    );

    return await this.prisma.product.update({
      where: { id: productId },
      data: {
        medias: {
          connect: medias.map((media) => ({ id: media.id })),
        },
      },
      include: {
        medias: true,
      },
    });
  }

  async deleteProductMedia(productId: number, dto: DeleteProductMediaDto) {
    await this.productService.findOne(productId);

    const { mediaIds } = dto;

    await Promise.all(
      mediaIds.map(async (mediaId) => {
        await this.mediaService.delete(mediaId);
      }),
    );

    return await this.prisma.product.update({
      where: { id: productId },
      data: {
        medias: {
          disconnect: mediaIds.map((id) => ({ id })),
        },
      },
      include: {
        medias: true,
      },
    });
  }
}
