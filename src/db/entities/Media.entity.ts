import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { Product } from '.';

export const MediaContext = {
  PRODUCT: 'product',
  CATEGORY: 'category',
} as const;

export type MediaContextType = (typeof MediaContext)[keyof typeof MediaContext];

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
  context: MediaContextType;

  @Column({ nullable: true })
  productDetailsId: number;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.medias)
  @JoinColumn({ name: 'productId' })
  products: Product;

  @OneToOne(() => Product, (product) => product.profileImage)
  profileImage: Product;

  constructor(item: Partial<Media>) {
    Object.assign(this, item);
  }
}
