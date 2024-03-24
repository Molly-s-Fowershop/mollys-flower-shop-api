import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(40)
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(12)
  @MaxLength(15)
  phone: string;

  @IsNotEmpty()
  @IsString()
  hashedPassword: string;
}
