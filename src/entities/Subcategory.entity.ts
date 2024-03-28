import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product, Category } from '.';

@Entity()
export class Subcategory {
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

  @ManyToOne(() => Category, (category) => category.subcategories)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => Product, (product) => product.subcategories)
  products: Product[];

  constructor(item: Partial<Subcategory>) {
    Object.assign(this, item);
  }
}
