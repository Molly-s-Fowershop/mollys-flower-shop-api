import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CouponCode, ProductOffer, CategoryOffer } from '.';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  maxUses: number;

  @Column()
  discountType: string;

  @Column()
  discountValue: number;

  @Column()
  isAvailable: boolean;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  offerContext: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => CouponCode, (couponCode) => couponCode.offer)
  couponCode: CouponCode[];

  @OneToMany(() => ProductOffer, (productOffer) => productOffer.offer)
  ProductOffer: ProductOffer[];

  @OneToMany(() => CategoryOffer, (categoryOffer) => categoryOffer.offer)
  CategoryOffer: CategoryOffer[];

  constructor(item: Partial<Offer>) {
    Object.assign(this, item);
  }
}
