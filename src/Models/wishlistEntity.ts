import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./productEntity";
import { User } from "./userEntity";

@Entity()
export class WishList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=> Product, (product)=> product.wishlist)
  product: Product;

  @ManyToOne(()=> User, (user)=> user.wishlist)
  user: User
}
