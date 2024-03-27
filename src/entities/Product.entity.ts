import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import {
  ProductDetails,
  Category,
  Subcategory,
  CustomizationGroup,
  OrderItem,
  CartItem,
  ProductOffer,
  Media,
  WishlistItem,
} from '.';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => ProductDetails, (productDetails) => productDetails.product)
  productDetails: ProductDetails;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @OneToMany(() => Subcategory, (subcategory) => subcategory.products)
  subcategories: Subcategory[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItem: OrderItem[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[];

  @OneToMany(() => Media, (media) => media.products)
  medias: Media[];

  @OneToMany(() => ProductOffer, (productOffer) => productOffer.product)
  productOffers: ProductOffer[];

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.product)
  wishlistItem: WishlistItem[];

  @OneToMany(
    () => CustomizationGroup,
    (customizationGroup) => customizationGroup.products,
  )
  customizationGroups: CustomizationGroup[];

  constructor(item: Partial<Product>) {
    Object.assign(this, item);
  }
}
