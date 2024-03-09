import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsNotEmpty } from 'class-validator';

export class MutateCategorySubcategoryDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => Number)
  subcategoryIds: number[];
}
