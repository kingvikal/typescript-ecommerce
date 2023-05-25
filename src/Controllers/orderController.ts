import { Request, Response } from "express";
import { OrderItem } from "../Models/orderItemEntity";
import { AppDataSource } from "../Utils/appDataSource";
import { Payment } from "../Models/paymentEntity";
import { Shipment } from "../Models/shipmentEntity";
import { User } from "../Models/userEntity";
import { Order } from "../Models/orderEntity";

interface UserRequest extends Request {
  user: any;
}

const userRepo = AppDataSource.getRepository(User);
const orderItemRepo = AppDataSource.getRepository(OrderItem);
const paymentRepo = AppDataSource.getRepository(Payment);
const shipmentRepo = AppDataSource.getRepository(Shipment);
const orderRepo = AppDataSource.getRepository(Order);

export const createOrder = async (req: UserRequest, res: Response) => {
  try {
    const { orderItemId, paymentId, shipmentId, orderDate, totalPrice }: any =
      req.body;
    const { id } = req.user;

    const orderItem: OrderItem = await orderItemRepo.findOne({
      where: { id: orderItemId },
    });

    const payment = await paymentRepo.findOne({ where: { id: paymentId } });

    const shipment = await shipmentRepo.findOne({ where: { id: shipmentId } });

    const user = await userRepo.findOne({
      where: { id: id },
    });

    const order: Order = await orderRepo.findOne({
      relations: ["user", "payments", "shipment", "orderItem"],
      where: { user: { id: id } },
    });

    const orders = new Order();

    let result: any;

    orders.totalPrice = orderItem.totalPrice * totalPrice;
    orders.payments = payment;
    orders.shipment = shipment;
    orders.orderDate = new Date();
    orders.user = user;
    orders.shippedTo = user.firstname;
    orders.orderItem = [orderItem];
    result = await orderRepo.save(orders);

    if (result) {
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

export const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await AppDataSource.getRepository(Order).find({
      relations: ["orderItem", "user", "orderItem.product"],
    });
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
