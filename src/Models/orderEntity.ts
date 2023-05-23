import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./orderItemEntity";
import { Payment } from "./paymentEntity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  orderDate: Date;

  @Column()
  totalPrice: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItem: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payment: Payment[];
}
