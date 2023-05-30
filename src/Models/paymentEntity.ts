import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./orderEntity";
import { User } from "./userEntity";

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

  @OneToMany(() => Order, (order) => order.payments, {
    onDelete: "CASCADE",
  })
  order: Order[];

  @ManyToOne(() => User, (user) => user.payment)
  user: User;
}
