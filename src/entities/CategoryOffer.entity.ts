import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Offer, Category } from '.';

@Entity()
export class CategoryOffer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Offer, (offer) => offer.CategoryOffer)
  @JoinColumn({ name: 'offerId' })
  offer: Offer;

  @ManyToOne(() => Category, (category) => category.categoryOffers)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
