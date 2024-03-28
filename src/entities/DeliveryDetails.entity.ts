import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem, Address } from '.';

@Entity()
export class DeliveryDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  itemId: number;

  @Column()
  deliverDate: Date;

  @Column()
  deliverTime: string;

  @Column({ nullable: true })
  deliveryAddressId: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Address, (address) => address.DeliveryDetails)
  @JoinColumn({ name: 'deliveryAddressId' })
  deliveryAddress: Address;

  @ManyToOne(() => OrderItem, (orderItem) => orderItem.deliveryDetails)
  @JoinColumn({ name: 'itemId' })
  item: OrderItem;

  constructor(item: Partial<DeliveryDetails>) {
    Object.assign(this, item);
  }
}
