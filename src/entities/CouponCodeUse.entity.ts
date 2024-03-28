import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CouponCode, User } from '.';

@Entity()
export class CouponCodeUse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  couponId: number;

  @Column()
  userId: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.couponCodeUse)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => CouponCode, (couponCode) => couponCode.couponCodeUse)
  @JoinColumn({ name: 'couponId' })
  coupon: CouponCode;

  constructor(item: Partial<CouponCodeUse>) {
    Object.assign(this, item);
  }
}
