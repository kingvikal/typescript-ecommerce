import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./categoryEntity";
import { WishList } from "./wishlistEntity";
import { Cart } from "./cartEntity";
import { OrderItem } from "./orderItemEntity";

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

  @Column({ default: 1 })
  quantity: number;

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;

  @ManyToMany(() => WishList, (wishlist) => wishlist.product)
  wishlist: WishList[];

  @OneToMany(() => Cart, (cart) => cart.product)
  cart: Cart[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItem: OrderItem[];
}
