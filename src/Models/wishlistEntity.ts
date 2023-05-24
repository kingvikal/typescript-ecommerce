import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./productEntity";
import { User } from "./userEntity";

@Entity()
export class WishList {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Product, (product) => product.wishlist)
  @JoinTable()
  product: Product[];

  @OneToOne(() => User, (user) => user.wishlist)
  @JoinColumn()
  user: User;
}
