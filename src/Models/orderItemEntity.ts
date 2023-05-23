import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./productEntity";
import { Order } from "./orderEntity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Product, (product) => product.orderItem)
  product: Product;

  @ManyToOne(()=> Order, (order)=> order.orderItem)
  order: Order;
}
