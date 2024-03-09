import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateCategorySubcategoryDto,
  MutateCategorySubcategoryDto,
} from '@modules/category/dto';
import { CategorySubcategoryService } from '@modules/category/services/category-subcategory.service';

@Controller('categories/:categoryId/subcategories')
export class CategorySubcategoryController {
  constructor(private categorySubcategoryService: CategorySubcategoryService) {}

  @Get()
  findAll(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categorySubcategoryService.findAll(categoryId);
  }

  @Get(':id')
  findOne(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.categorySubcategoryService.findOne(categoryId, id);
  }

  @Post()
  create(
    @Body() dto: CreateCategorySubcategoryDto,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.categorySubcategoryService.create(categoryId, dto);
  }

  // ! Maybe this endpoint will be deleted in future. Need to check with the client
  @Patch()
  update(
    @Body() dto: MutateCategorySubcategoryDto,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.categorySubcategoryService.update(categoryId, dto);
  }

  @Delete()
  remove(
    @Body() dto: MutateCategorySubcategoryDto,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.categorySubcategoryService.remove(categoryId, dto);
  }
}
