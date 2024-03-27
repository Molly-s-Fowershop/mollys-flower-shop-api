import { Module } from '@nestjs/common';
import { SubcategoryService } from './services/subcategory.service';
import { OrmModule } from '@modules/orm/orm.module';

@Module({
  imports: [OrmModule],
  providers: [SubcategoryService],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
