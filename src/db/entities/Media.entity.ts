import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '.';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  s3Name: string;

  @Column()
  url: string;

  @Column()
  type: string;

  @Column()
  context: string;

  @Column({ nullable: true })
  productDetailsId: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.medias)
  @JoinColumn({ name: 'productId' })
  products: Product;

  constructor(item: Partial<Media>) {
    Object.assign(this, item);
  }
}
