import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

enum UpdateType {
  Add = 'add',
  Remove = 'remove',
}

export class UpdateWishlistDto {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  productId: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  @IsEnum(UpdateType)
  type: UpdateType;
}
