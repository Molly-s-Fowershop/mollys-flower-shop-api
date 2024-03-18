import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty } from 'class-validator';

export class DeleteProductMediaDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  mediaIds: number[];
}
