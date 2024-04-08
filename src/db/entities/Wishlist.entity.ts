import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { WishlistItem, User } from '.';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => User, (user) => user.wishlist)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.wishlist)
  items: WishlistItem[];

  constructor(item: Partial<Wishlist>) {
    Object.assign(this, item);
  }
}
