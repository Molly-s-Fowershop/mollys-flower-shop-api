import { Module } from '@nestjs/common';
import { SubcategoryService } from './services/subcategory.service';

@Module({
  providers: [SubcategoryService],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
