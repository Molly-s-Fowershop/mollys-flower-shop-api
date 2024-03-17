import {
  PutObjectCommand,
  S3Client,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private readonly bucketName =
    this.configService.get('AWS_S3_BUCKET_NAME') ?? 'nestjs-s3-example';
  private readonly region =
    this.configService.get('AWS_S3_REGION') ?? 'us-east-1';

  private readonly s3Client = new S3Client({
    region: this.region,
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(key: string, file: Express.Multer.File) {
    const fileName = `${key}.${file.originalname.split('.').pop()}`;

    const input: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(input));

      return {
        fileName,
        url: `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
