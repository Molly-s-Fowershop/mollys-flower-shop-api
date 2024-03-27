import { Module } from '@nestjs/common';
import { MediaService } from './services/media.service';
import { S3Module } from '@modules/s3/s3.module';
import { OrmModule } from '@modules/orm/orm.module';

@Module({
  imports: [S3Module, OrmModule],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
