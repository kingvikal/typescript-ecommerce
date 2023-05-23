import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Order } from "./orderEntity";
import { User } from "./userEntity";

@Entity()
export class Shipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @CreateDateColumn()
  shipmentDate: Date;

  @OneToMany(()=> Order, (order)=> order.shipment)
  order: Order[]

  @ManyToOne(()=> User, (user) => user.shipment)
  user: User;
}
