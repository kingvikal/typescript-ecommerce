import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./orderEntity";
import { Product } from "./productEntity";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  quantity: number;

  @Column("float")
  unit_price: number;

  @Column({ nullable: true })
  totalPrice: number;

  @ManyToOne(() => Order, (order) => order.orderItem)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderItem)
  product: Product;
}
