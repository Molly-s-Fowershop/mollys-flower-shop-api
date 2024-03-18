import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from '../dto';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { S3Service } from '@/modules/s3/services/s3.service';
import { MediaContextType } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MediaService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
  ) {}

  async findAll() {
    return {
      data: await this.prisma.media.findMany(),
      meta: {
        count: await this.prisma.media.count(),
      },
    };
  }

  async findOne(id: number) {
    const media = await this.prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    return media;
  }

  async create(
    dto: CreateMediaDto,
    file: Express.Multer.File,
    context: MediaContextType,
  ) {
    const key: string = uuidv4();
    const { title, description } = dto;
    const { mimetype } = file;

    const { fileName, url } = await this.s3Service.upload(key, file);

    return await this.prisma.media.create({
      data: {
        title,
        s3Name: fileName,
        description,
        type: mimetype,
        url,
        context,
      },
    });
  }

  async createMany(
    dtos: CreateMediaDto[],
    file: Array<Express.Multer.File>,
    context: MediaContextType,
  ) {
    const medias = await Promise.all(
      file.map(async (file, index) => {
        const key: string = uuidv4();
        const { title, description } = dtos[index];
        const { mimetype } = file;

        const { fileName, url } = await this.s3Service.upload(key, file);

        return await this.prisma.media.create({
          data: {
            title,
            s3Name: fileName,
            description,
            type: mimetype,
            url,
            context,
          },
        });
      }),
    );

    return medias;
  }

  async delete(id: number) {
    const media = await this.prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      throw new NotFoundException('Media not found');
    }

    await this.s3Service.delete(media.s3Name);

    return await this.prisma.media.delete({
      where: { id },
    });
  }
}
