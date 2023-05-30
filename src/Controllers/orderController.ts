import { Request, Response } from "express";
import { OrderItem } from "../Models/orderItemEntity";
import { AppDataSource } from "../Utils/appDataSource";
import { User } from "../Models/userEntity";
import { Order } from "../Models/orderEntity";
import { createOrderItem } from "./orderItemController";

interface UserRequest extends Request {
  user: any;
}

const userRepo = AppDataSource.getRepository(User);
const orderItemRepo = AppDataSource.getRepository(OrderItem);
const orderRepo = AppDataSource.getRepository(Order);

export const createOrder = async (req: UserRequest, res: Response) => {
  try {
    const {
      orderItemId,
      shippingDetails,
      productId,
      quantity,
      orderType,
      orderId,
    }: any = req.body;
    const { id } = req.user;

    const orderItem: OrderItem = await orderItemRepo
      .createQueryBuilder("orderItem")
      .leftJoinAndSelect("orderItem.order", "order")
      .where("orderItem.id = :orderItemId", { orderItemId })
      .getOne();

    const user = await userRepo
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOne();

    console.log("user", user);

    let totalPrice = (items: any) => {
      return items.reduce((acc: any, curr: any) => {
        return acc + curr.quantity * curr.unit_price;
      }, 0);
    };

    const orders = new Order();

    orders.orderDate = new Date();
    orders.user = user;
    orders.orderItem = [orderItem];
    orders.totalPrice = totalPrice(orders.orderItem);
    orders.shippingDetails = shippingDetails;
    orders.shippedTo = `this is shipped to : ${user.firstname}`;
    orders.orderType = orderType;

    if (orders) {
      await orderRepo.save(orders);
      createOrderItem(productId, quantity, orderId);

      return res
        .status(200)
        .json({ success: "Order created Successfully", data: orders });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getOrder = async (req: UserRequest, res: Response) => {
  try {
    const { id } = req.user;
    const user = await userRepo.findOne({
      where: { id: id },
    });

    const order = await orderRepo
      .createQueryBuilder("order")
      .innerJoinAndSelect("order.orderItem", "orderItem")
      .innerJoinAndSelect("order.user", "user")
      .innerJoinAndSelect("orderItem.product", " product")
      .getMany();

    if (user && order) {
      return res.status(200).json({ data: order });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const order = await AppDataSource.getRepository(Order).findOne({
      where: { id: id },
      relations: { orderItem: true, user: true },
    });
    if (order) {
      return res.status(200).json({ data: order });
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
};

export const deleteOrder = async (req: UserRequest, res: Response) => {
  try {
    const { id }: any = req.params;

    const deleteOrder = await orderRepo
      .createQueryBuilder("order")
      .delete()
      .from(Order)
      .where("id = :id", { id })
      .execute();

    if (deleteOrder.affected === 0) {
      return res.status(400).json({ message: "order already deleted" });
    }

    return res.status(200).json({
      message: "successfully deleted order",
      data: `${deleteOrder.affected} row deleted`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
