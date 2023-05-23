import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./productEntity";

@Entity()
export class WishList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=> Product, (product)=> product.wishlist)
  product: Product;
}
