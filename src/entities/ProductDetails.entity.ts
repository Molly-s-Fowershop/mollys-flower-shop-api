import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
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

  @OneToOne(() => Product, (product) => product.productDetails)
  @JoinColumn({ name: 'productId' })
  product: Product;

  constructor(item: Partial<ProductDetails>) {
    Object.assign(this, item);
  }
}
