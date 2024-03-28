import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User, CartItem } from '.';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItem: CartItem[];
}
