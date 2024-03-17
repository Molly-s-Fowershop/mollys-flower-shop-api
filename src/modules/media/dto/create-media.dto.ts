import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MediaContextType } from '@prisma/client';

export class CreateMediaDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsEnum(MediaContextType)
  type: MediaContextType;
  context: MediaContextType;
}
