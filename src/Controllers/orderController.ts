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

    const orderItem: OrderItem = await orderItemRepo.findOne({
      where: { id: orderItemId },
      relations: ["order"],
    });

    const user = await userRepo.findOne({
      where: { id: id },
    });

    let totalPrice = (items: any) => {
      return items.reduce((prevValue: any, currentValue: any) => {
        return prevValue + currentValue.quantity * currentValue.unit_price;
      }, 0);
    };

    const orders = new Order();

    orders.orderDate = new Date();
    orders.user = user;
    orders.orderItem = [orderItem];
    orders.totalPrice = totalPrice(orders.orderItem);
    orders.shippingDetails = shippingDetails;
    orders.shippedTo = user.firstname;
    orders.orderType = orderType;

    if (orders) {
      createOrderItem(productId, quantity, orderId);

      await orderRepo.save(orders);

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

    const order = await AppDataSource.getRepository(Order).find({
      where: { user: id },
      relations: ["orderItem", "user", "orderItem.product"],
    });

    console.log("order", order);

    if (order) {
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
      relations: ["orderItem", "user", "orderItem.product"],
    });
    if (order) {
      return res.status(200).json({ data: order });
    }
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
};

export const deletOrder = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const order = await AppDataSource.getRepository(Order).delete({
      id,
    });
    if (order.affected === 0) {
      return res.status(400).json({ message: "order already deleted" });
    }
    return res.status(200).json({
      message: "successfully deleted order",
      data: `${order.affected} row deleted`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
