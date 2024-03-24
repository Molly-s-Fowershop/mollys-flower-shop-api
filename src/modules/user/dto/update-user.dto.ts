import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  lastname: string;

  @IsOptional()
  @IsString()
  @MinLength(12)
  @MaxLength(15)
  phone: string;
}
