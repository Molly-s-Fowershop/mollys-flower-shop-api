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
import { Cart, Product, Customization } from '.';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cartId: number;

  @Column()
  productId: number;

  @Column()
  quantity: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Customization, (customization) => customization.cartItem)
  customizations: Customization[];

  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Cart, (cart) => cart.cartItem)
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  constructor(item: Partial<CartItem>) {
    Object.assign(this, item);
  }
}
