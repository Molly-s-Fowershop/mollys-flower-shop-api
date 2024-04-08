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

const ProductType = {
  STANDARD: 'STANDARD',
  PREMIUM: 'PREMIUM',
} as const;

export type ProductType = (typeof ProductType)[keyof typeof ProductType];

@Entity()
export class ProductDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column()
  stock: number;

  @Column({ default: 'STANDARD' })
  type: ProductType;

  @Column({ nullable: true })
  limitPerDay: number;

  @Column({ nullable: true })
  productId: number;

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
