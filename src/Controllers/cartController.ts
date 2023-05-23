import { Request, Response } from "express";
import { Cart } from "../Models/cartEntity";
import { AppDataSource } from "../Utils/appDataSource";
import { User } from "../Models/userEntity";
import { Product } from "../Models/productEntity";

const cartRepository = AppDataSource.getRepository(Cart);
interface UserRequest extends Request {
  user: any;
}

export const createCart = async (req: UserRequest, res: Response) => {
  try {
    const { id } = req.user;

    const { id: productId, quantity } = req.body;

    const user: User = await AppDataSource.getRepository(User).findOne({
      where: { id },
    });

    const product = await AppDataSource.getRepository(Product).findOne({
      where: { id: productId },
    });

    const cart = new Cart();
    cart.quantity = quantity;
    cart.user = user;
    cart.product = product;

    if (!quantity) {
      return res.status(400).json({ message: "fill the fields" });
    }

    await cartRepository.save(cart);

    return res.status(200).json({ message: "cart created successfull", cart });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getAllCart = async (req: Request, res: Response) => {
  try {
    const cart = await AppDataSource.getRepository(Cart).find({
      relations: ["user", "product"],
    });
    console.log(cart, "cart");

    if (cart) {
      return res.status(200).json({ data: cart });
    } else {
      return res.status(400).json("No cart found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getCartById = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;

    let data = await AppDataSource.getRepository(Cart).findOne({
      where: { id },
    });

    if (data) {
      return res.status(200).json({ data: data });
    } else {
      return res.status(400).json("cart not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const { quantity } = req.body;

    let updateCart = await AppDataSource.getRepository(Cart).update(
      { id },
      { quantity: quantity }
    );

    if (!quantity) {
      return res.status(400).json({ message: "fill all field" });
    }

    if (updateCart) {
      return res.status(200).json({
        message: "Cart Updated",
        data: `${updateCart.affected} row updated`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;

    const deleteCart = await AppDataSource.getRepository(Cart).delete({ id });

    if (deleteCart.affected === 0 || !deleteCart) {
      return res
        .status(400)
        .json({ message: "Cart already deleted or Cart not found" });
    }

    return res.status(200).json({
      success: "Successfull",
      message: `${deleteCart.affected} row deleted`,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json(err);
  }
};
