import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
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

  @ManyToOne(() => User, (user) => user.wishList)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.wishlist)
  items: WishlistItem[];

  constructor(item: Partial<Wishlist>) {
    Object.assign(this, item);
  }
}
