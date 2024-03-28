import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Offer, CouponCodeUse } from '.';

@Entity()
export class CouponCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  offerId: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Offer, (offer) => offer.couponCode)
  @JoinColumn({ name: 'offerId' })
  offer: Offer;

  @OneToMany(() => CouponCodeUse, (couponCodeUse) => couponCodeUse.coupon)
  couponCodeUse: CouponCodeUse[];

  constructor(item: Partial<CouponCode>) {
    Object.assign(this, item);
  }
}
