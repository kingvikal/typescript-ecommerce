import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "../Models/userEntity";
import { Category } from "../Models/categoryEntity";
import { Product } from "../Models/productEntity";
import { WishList } from "../Models/wishlistEntity";
import { Cart } from "../Models/cartEntity";
import { Order } from "../Models/orderEntity";
import { OrderItem } from "../Models/orderItemEntity";
import { Payment } from "../Models/paymentEntity";
import { Shipment } from "../Models/shipmentEntity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  password: process.env.DB_PASS,
  username: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  synchronize: true,
  entities: [
    User,
    Category,
    Product,
    WishList,
    Cart,
    Order,
    OrderItem,
    Payment,
    Shipment,
  ],
});
