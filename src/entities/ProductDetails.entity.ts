import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '.';

@Entity()
export class ProductDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({ default: 'STANDARD' })
  type: string;

  @Column({ nullable: true })
  limitPerDay: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Product, (product) => product.productDetails)
  product: Product;

  constructor(item: Partial<ProductDetails>) {
    Object.assign(this, item);
  }
}
