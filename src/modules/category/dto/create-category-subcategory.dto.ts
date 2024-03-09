import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateSubcategoryDto } from '@/modules/subcategory/dto/create-subcategory.dto';
import { OmitType } from '@nestjs/mapped-types';

class CreateSubcategory extends OmitType(CreateSubcategoryDto, [
  'categoryId',
]) {}

export class CreateCategorySubcategoryDto {
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateSubcategory)
  subcategories: CreateSubcategoryDto[];
}
