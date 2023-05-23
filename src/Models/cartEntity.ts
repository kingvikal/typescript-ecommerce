import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./productEntity";
import { User } from "./userEntity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, (product) => product.cart)
  product: Product;

  @ManyToOne(() => User, (user) => user.cart)
  user: User;
}
