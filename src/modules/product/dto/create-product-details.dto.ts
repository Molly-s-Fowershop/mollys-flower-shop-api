import { ProductType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDetailsDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsEnum(ProductType)
  type: ProductType;

  @IsOptional()
  @IsNumber()
  limitPerDay: number;
}
