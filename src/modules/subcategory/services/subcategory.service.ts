import { Injectable, NotFoundException } from '@nestjs/common';
import { Subcategory } from '@/db/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
  ) {}

  async findAll() {
    const subcategories = await this.subcategoryRepository.find();

    return {
      data: subcategories,
      meta: {
        count: subcategories.length,
      },
    };
  }

  async findOne(subcategoryId: number) {
    const subcategory = await this.findOne(subcategoryId);

    if (!subcategory) {
      throw new NotFoundException('Subcategory not found');
    }

    return subcategory;
  }
}
