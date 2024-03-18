import { IsOptional, IsString } from 'class-validator';

export class CreateMediaDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
