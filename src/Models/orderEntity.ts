import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderItem } from "./orderItemEntity";
import { Payment } from "./paymentEntity";
import { Shipment } from "./shipmentEntity";
import { User } from "./userEntity";

enum ORDERSTATUS {
  PROCESSED = "processed",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    default: new Date(),
  })
  orderDate: Date;

  @Column()
  totalPrice: number;

  @Column({ nullable: true })
  shippedTo: string;

  @Column({ type: "enum", enum: ORDERSTATUS, default: ORDERSTATUS.PROCESSED })
  orderType: ORDERSTATUS;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItem: OrderItem[];

  @ManyToOne(() => Payment, (payment) => payment.order)
  payments: Payment;

  @ManyToOne(() => User, (user) => user.order)
  user: User;

  @OneToOne(() => Shipment, (shipment) => shipment.order)
  @JoinColumn()
  shipment: Shipment;
}
