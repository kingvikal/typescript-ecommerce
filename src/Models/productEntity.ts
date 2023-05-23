import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./categoryEntity";
import { WishList } from "./wishlistEntity";
import { Cart } from "./cartEntity";
import { OrderItem } from "./orderItemEntity";
import { Order } from "./orderEntity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  price: number;

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  @OneToMany(() => WishList, (wishlist) => wishlist.product)
  wishlist: WishList[];

  @OneToMany(() => Cart, (cart) => cart.product)
  cart: Cart[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItem: OrderItem[];
}
