import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./productEntity";

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(()=> Product, (product) => product.cart)
  product: Product;
}
