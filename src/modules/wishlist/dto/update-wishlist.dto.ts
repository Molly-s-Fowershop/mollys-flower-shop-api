import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum WishlistUpdateType {
  Add = 'addItem',
  Remove = 'removeItem',
}

export class UpdateWishlistDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  productId: number;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsEnum(WishlistUpdateType)
  type: WishlistUpdateType;
}
