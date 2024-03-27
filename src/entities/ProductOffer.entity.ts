import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Offer, Product } from '.';

@Entity()
export class ProductOffer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  offerId: number;

  @Column()
  productId: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Offer, (offer) => offer.ProductOffer)
  @JoinColumn({ name: 'offerId' })
  offer: Offer;

  @ManyToOne(() => Product, (product) => product.productOffers)
  @JoinColumn({ name: 'productId' })
  product: Product;

  constructor(item: Partial<ProductOffer>) {
    Object.assign(this, item);
  }
}
