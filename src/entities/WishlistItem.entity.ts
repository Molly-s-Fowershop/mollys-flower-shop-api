import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product, Wishlist } from '.';

@Entity()
export class WishlistItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  wishlistId: number;

  @Column()
  productId: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.items)
  @JoinColumn({ name: 'wishlistId' })
  wishlist: Wishlist;

  @ManyToOne(() => Product, (product) => product.wishListItem)
  @JoinColumn({ name: 'productId' })
  product: Product;

  constructor(item: Partial<WishlistItem>) {
    Object.assign(this, item);
  }
}
