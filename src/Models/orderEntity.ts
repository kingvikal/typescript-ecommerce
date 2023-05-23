import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderItem } from "./orderItemEntity";
import { Payment } from "./paymentEntity";
import { User } from "./userEntity";
import { Shipment } from "./shipmentEntity";

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

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @ManyToOne(()=> Shipment, (shipment) => shipment.order)
  shipment: Shipment;
}
