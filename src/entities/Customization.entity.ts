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
import { CustomizationGroup, CartItem } from '.';

@Entity()
export class Customization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(
    () => CustomizationGroup,
    (customizationGroup) => customizationGroup.customization,
  )
  @JoinColumn({ name: 'customizationGroupId' })
  customizationGroup: CustomizationGroup;

  @OneToMany(() => CartItem, (cartItem) => cartItem.customizations)
  cartItem: CartItem[];

  constructor(item: Partial<Customization>) {
    Object.assign(this, item);
  }
}
