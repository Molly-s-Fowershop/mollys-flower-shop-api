import { JwtGuard } from '@/modules/auth/guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto';

@UseGuards(JwtGuard)
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(id: string) {
    return this.categoryService.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoryService.create(dto);
  }

  @Patch(':id')
  update(@Body() dto: UpdateCategoryDto, @Param('id') id: string) {
    console.log('id', id);
    return this.categoryService.update(+id, dto);
  }

  @Delete(':id')
  remove(id: string) {
    return this.categoryService.remove(+id);
  }
}
