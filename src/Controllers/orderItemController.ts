import { Request, Response } from "express";
import { AppDataSource } from "../Utils/appDataSource";
import { Product } from "../Models/productEntity";
import { OrderItem } from "../Models/orderItemEntity";
import { Order } from "../Models/orderEntity";

export const createOrderItem = async (
  productId: any,
  quantity: any,
  orderId: any
) => {
  const product: Product = await AppDataSource.getRepository(Product).findOne({
    where: { id: productId },
    relations: ["orderItem"],
  });

  const order: Order = await AppDataSource.getRepository(Order).findOne({
    where: { id: orderId },
    relations: ["orderItem"]
  });

  const orderItem = new OrderItem();

  orderItem.product = product;
  orderItem.quantity = quantity;
  orderItem.unit_price = product.price;
  orderItem.order = order;

  await AppDataSource.getRepository(OrderItem).save(orderItem);

  return [product, quantity, orderId];
};

export const getAllOrderItem = async (req: Request, res: Response) => {
  try {
    const getOrderItem = await AppDataSource.getRepository(OrderItem).find({
      relations: ["order", "product"],
    });

    if (getOrderItem) {
      return res.status(200).json({ data: getOrderItem });
    } else {
      return res.status(400).json({ errorMessage: "No orderItem found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getOrderItemById = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    let getById = await AppDataSource.getRepository(OrderItem).findOne({
      where: { id },
      relations: { product: true, order: true },
    });
    if (getById) {
      return res.status(200).json({ data: getById });
    } else {
      return res.status(500).json({ message: "No orderItem found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const updateOrderItem = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const { price, quantity } = req.body;

    const updateOrderItem = await AppDataSource.getRepository(OrderItem).update(
      {
        id,
      },
      { quantity: quantity }
    );

    if (!price || !quantity) {
      return res.status(404).json({ message: "field must not be empty" });
    }

    return res.status(200).json({
      message: "OrderItem Updated",
      data: `${updateOrderItem.affected} row updated`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteOrderItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleteOrderItem = await AppDataSource.getRepository(OrderItem).delete(
      id
    );

    if (deleteOrderItem.affected === 0) {
      return res.status(400).json({ message: "OrderItem already deleted" });
    }
    return res.status(200).json({ success: "Order Item deleted Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
