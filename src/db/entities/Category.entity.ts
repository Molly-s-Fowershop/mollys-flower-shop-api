import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product, Subcategory, CategoryOffer } from '.';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

  @OneToMany(() => CategoryOffer, (categoryOffer) => categoryOffer.category)
  categoryOffers: CategoryOffer[];

  constructor(item: Partial<Category>) {
    Object.assign(this, item);
  }
}
