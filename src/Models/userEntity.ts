import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { WishList } from "./wishlistEntity";
import { Payment } from "./paymentEntity";
import { Order } from "./orderEntity";
import { Cart } from "./cartEntity";
import { Shipment } from "./shipmentEntity";

enum UserRole {
  ADMIN = "admin",
  CUSTOMER = "customer",
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  firstname: string;

  @Column({ length: 20 })
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => WishList, (wishlist) => wishlist.user)
  wishlist: WishList[];

  @OneToMany(() => Payment, (payment) => payment.user)
  payment: Payment[];

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  @OneToMany(() => Shipment, (shipment) => shipment.user)
  shipment: Shipment[];

  @Column({ type: "enum", enum: UserRole, default: UserRole.CUSTOMER })
  userType: UserRole;
}
