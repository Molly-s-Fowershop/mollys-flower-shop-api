import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ProductType } from '@/db/entities/ProductDetails.entity';

export class CreateProductDetailsDto {
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  type: ProductType;

  @IsOptional()
  @IsNumber()
  limitPerDay: number;
}
