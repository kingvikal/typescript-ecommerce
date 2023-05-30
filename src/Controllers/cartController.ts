import { Request, Response } from "express";
import { Cart } from "../Models/cartEntity";
import { AppDataSource } from "../Utils/appDataSource";
import { User } from "../Models/userEntity";
import { Product } from "../Models/productEntity";

interface UserRequest extends Request {
  user: any;
}
const userRepo = AppDataSource.getRepository(User);
const productRepo = AppDataSource.getRepository(Product);
const cartRepo = AppDataSource.getRepository(Cart);

export const createCart = async (req: UserRequest, res: Response) => {
  try {
    const { id } = req.user;

    const { productId, quantity } = req.body;

    const user: User = await userRepo
      .createQueryBuilder("user")
      .where("user.id = :id", { id })
      .getOne();

    const product = await productRepo
      .createQueryBuilder("product")
      .innerJoinAndSelect("product.cart", "cart")
      .where("product.id = :productId", { productId })
      .getOne();

    product.quantity = product.quantity + quantity;

    const cart = new Cart();
    if (user && product) {
      cart.quantity = quantity;
      cart.user = user;
      cart.product = product;
    }

    if (product === null && !product) {
      return res.status(400).json({
        message: "product cannot be empty",
      });
    }

    if (!quantity) {
      return res.status(400).json({ message: "fill the fields" });
    }
    await cartRepo.save(cart);
    return res.status(200).json({ message: "cart added successfull", cart });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getAllCart = async (req: Request, res: Response) => {
  try {
    const cart = await cartRepo
      .createQueryBuilder("cart")
      .leftJoinAndSelect("cart.user", "user")
      .leftJoinAndSelect("cart.product", "product")
      .getMany();

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

    const data = await cartRepo
      .createQueryBuilder("cart")
      .where("cart.id = :id", { id })
      .leftJoinAndSelect("cart.user", "user")
      .leftJoinAndSelect("cart.product", "product")
      .getOne();

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

    let updateCart = await cartRepo
      .createQueryBuilder("cart")
      .update(Cart)
      .set({ quantity: quantity })
      .where("cart.id = :id", { id })
      .execute();

    if (!quantity) {
      return res.status(400).json({ message: "fill all field" });
    }

    if (updateCart.affected === 0) {
      return res
        .status(400)
        .json({ message: `Sorry, the cart is already updated or not found` });
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

    const deleteCart = await cartRepo
      .createQueryBuilder("cart")
      .delete()
      .from(Cart)
      .where("cart.id = :id", { id })
      .execute();

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
