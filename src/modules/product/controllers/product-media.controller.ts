import {
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  Delete,
  Body,
  ParseIntPipe,
  UploadedFiles,
} from '@nestjs/common';
import { ProductMediaService } from '../services/product-media.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DeleteProductMediaDto } from '../dto/delete-product-media.dto';

@Controller('products/:productId/medias')
export class ProductMediaController {
  constructor(private productMediaService: ProductMediaService) {}

  @Get()
  async findProductMedias(@Param('productId', ParseIntPipe) productId: number) {
    return await this.productMediaService.findProductMedias(productId);
  }

  @Post('')
  @UseInterceptors(FilesInterceptor('files'))
  async createMany(
    @Param('productId', ParseIntPipe) productId: number,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return await this.productMediaService.createManyProductMedia(
      productId,
      files,
    );
  }

  @Delete()
  async delete(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() dto: DeleteProductMediaDto,
  ) {
    return await this.productMediaService.deleteProductMedia(productId, dto);
  }
}
