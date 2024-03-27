import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order, Address, Product, DeliveryDetails } from '.';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  quantity: number;

  @Column()
  productId: number;

  @Column({ nullable: true })
  addressId: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Order, (order) => order.orderItem)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItem)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @ManyToOne(() => Address, (address) => address.orderItem)
  @JoinColumn({ name: 'addressId' })
  address: Address;

  @OneToMany(() => DeliveryDetails, (deliveryDetails) => deliveryDetails.item)
  deliveryDetails: DeliveryDetails[];

  constructor(item: Partial<OrderItem>) {
    Object.assign(this, item);
  }
}
