import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./orderEntity";

enum PaymentEnum {
  CASH = "cash",
  ESEWA = "esewa",
  KHALTI = "khalti",
  FONEPAY = "fonepay",
  MOBILEBANKING = "mobilebanking",
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentDate: Date;

  @Column({ type: "enum", enum: PaymentEnum, default: PaymentEnum.CASH })
  paymentMethod: PaymentEnum;

  @Column()
  amount: number;

  @ManyToOne(()=> Order, (order)=> order.payment)
  order: Order
}
