import { Module } from '@nestjs/common';
import { MediaService } from './services/media.service';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [S3Module],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
