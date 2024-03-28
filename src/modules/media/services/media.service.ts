import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from '../dto';
import { S3Service } from '@/modules/s3/services/s3.service';
import { MediaContextType } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from '@/entities';
import { Repository } from 'typeorm';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private s3Service: S3Service,
  ) {}

  async findAll() {
    const medias = await this.mediaRepository.find();

    return {
      data: medias,
      meta: {
        count: medias.length,
      },
    };
  }

  async findOne(id: number) {
    const media = await this.mediaRepository.findOne({
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

    return await this.mediaRepository.save({
      title,
      s3Name: fileName,
      description,
      type: mimetype,
      url,
      context,
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

        return this.mediaRepository.create({
          title,
          s3Name: fileName,
          description,
          type: mimetype,
          url,
          context,
        });
      }),
    );

    return medias;
  }

  async delete(id: number) {
    const media = await this.findOne(id);

    await this.s3Service.delete(media.s3Name);

    return await this.mediaRepository.delete(id);
  }
}
