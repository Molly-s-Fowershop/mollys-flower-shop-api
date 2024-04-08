import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { User, OrderItem, DeliveryDetails } from '.';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  streetNumber: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postalCode: string;

  @Column()
  country: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn()
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.address)
  orderItem: OrderItem[];

  @OneToMany(
    () => DeliveryDetails,
    (deliveryDetails) => deliveryDetails.deliveryAddress,
  )
  DeliveryDetails: DeliveryDetails[];

  constructor(item: Partial<Address>) {
    Object.assign(this, item);
  }
}
