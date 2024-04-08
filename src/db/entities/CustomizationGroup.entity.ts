import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customization, Product } from '.';

@Entity()
export class CustomizationGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    () => Customization,
    (customization) => customization.customizationGroup,
  )
  customization: Customization[];

  @ManyToMany(() => Product, (product) => product.customizationGroups)
  @JoinTable()
  products: Product[];

  constructor(item: Partial<CustomizationGroup>) {
    Object.assign(this, item);
  }
}
