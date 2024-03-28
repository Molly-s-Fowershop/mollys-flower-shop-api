import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Address, Cart, CouponCodeUse, UserNotification, Wishlist } from '.';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  hashedPassword: string;

  @Column()
  phone: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;

  @OneToOne(() => Wishlist, (wishlist) => wishlist.user)
  wishlist: Wishlist;

  @OneToMany(() => Address, (address) => address.user)
  addresses: Address[];

  @OneToMany(() => CouponCodeUse, (couponCodeUse) => couponCodeUse.user)
  couponCodeUse: CouponCodeUse[];

  @OneToMany(
    () => UserNotification,
    (userNotification) => userNotification.user,
  )
  userNotification: UserNotification[];

  constructor(item: Partial<User>) {
    Object.assign(this, item);
  }
}
