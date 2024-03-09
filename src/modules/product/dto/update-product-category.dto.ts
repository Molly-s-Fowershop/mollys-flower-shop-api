import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
