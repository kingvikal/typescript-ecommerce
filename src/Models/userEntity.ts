import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { WishList } from "./wishlistEntity";
import { Payment } from "./paymentEntity";
import { Cart } from "./cartEntity";
import { Order } from "./orderEntity";

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

  @OneToOne(() => WishList, (wishlist) => wishlist.user)
  wishlist: WishList;

  @OneToMany(() => Payment, (payment) => payment.user, {
    onDelete: "CASCADE",
  })
  payment: Payment[];

  @OneToMany(() => Cart, (cart) => cart.user, {
    onDelete: "CASCADE",
  })
  cart: Cart[];

  @OneToMany(() => Order, (order) => order.user, {
    onDelete: "CASCADE",
  })
  order: Order[];

  @Column({ type: "enum", enum: UserRole, default: UserRole.CUSTOMER })
  userType: UserRole;
}
