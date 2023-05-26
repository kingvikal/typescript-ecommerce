import { Request, Response } from "express";
import { AppDataSource } from "../Utils/appDataSource";
import { User } from "../Models/userEntity";
import { Order } from "../Models/orderEntity";
import { Payment } from "../Models/paymentEntity";

interface UserRequest extends Request {
  user: any;
  id: any;
}

const paymentRepo = AppDataSource.getRepository(Payment);
const userRepo = AppDataSource.getRepository(User);
const orderRepo = AppDataSource.getRepository(Order);

export const createPayment = async (req: UserRequest, res: Response) => {
  try {
    const { id } = req.user;
    const { orderId, paymentMethod } = req.body;

    const user = await userRepo.findOne({
      where: { id: id },
    });

    const order = await orderRepo.findOne({
      where: { id: orderId },
      relations: { payments: true },
    });

    const payment = new Payment();

    payment.paymentDate = new Date();
    payment.user = user;
    payment.paymentMethod = paymentMethod;
    payment.amount = order.totalPrice;
    payment.order = [order];

    await paymentRepo.save(payment);
    return res
      .status(200)
      .json({ message: "Payment created Successfully", data: payment });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getPayment = async (req: UserRequest, res: Response) => {
  try {
    const payment = await paymentRepo.find({
      relations: { user: true, order: true },
    });
    if (!payment) {
      return res.status(400).json({ message: "Payment not found" });
    }
    return res.status(200).json({ data: payment });
  } catch (err) {
    console.log(err);
    return res.status(200).json(err);
  }
};

export const getPaymentById = async (req: UserRequest, res: Response) => {
  try {
    const { id }: any = req.params;

    const payment = await paymentRepo.findOne({
      where: { id },
      relations: { user: true, order: true },
    });

    if (payment) {
      return res.status(200).json({ data: payment });
    }

    return res.status(200).json({});
  } catch (err) {
    console.log(err);
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;

    const payment = await paymentRepo.delete({
      id,
    });

    if (payment.affected === 0) {
      return res.status(400).json({ message: "Payment already deleted" });
    }

    return res.status(200).json({ success: "Payment deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};
