import { Request, Response } from "express";
import { AppDataSource } from "../Utils/appDataSource";
import { WishList } from "../Models/wishlistEntity";
import { Product } from "../Models/productEntity";
import { User } from "../Models/userEntity";

const wishlistRepository = AppDataSource.getRepository(WishList);

interface UserRequest extends Request {
  user: any;
}
export const createWishlist = async (req: UserRequest, res: Response) => {
  try {
    const { id } = req.user;
    console.log({ id });
    const { ProductId } = req.body;

    const product: Product = await AppDataSource.getRepository(Product).findOne(
      {
        where: { id: ProductId },
      }
    );
    console.log({ product });
    // if (!product) {
    //   return res.status(400).json("Product not found");
    // }
    const user: User = await AppDataSource.getRepository(User).findOne({
      where: { id },
    });

    const wishlist: WishList = await AppDataSource.getRepository(
      WishList
    ).findOne({
      relations: ["user", "product"],
      where: { user: { id: id } },
    });
    console.log({ wishlist });

    let resultTemp = new WishList();
    let result: any;

    if (product && user) {
      if (wishlist) {
        wishlist.product.push(product);
        result = await wishlistRepository.save(wishlist);
      } else {
        resultTemp.user = user;
        resultTemp.product = [product];

        result = await wishlistRepository.save(resultTemp);
      }
    } else {
      return res.status(404).json("Product Not Found");
    }
    if (result) {
      return res
        .status(200)
        .json({ message: "Wishlist Created Successfully", data: result });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getWishlist = async (req: UserRequest, res: Response) => {
  try {
    const getWishlist = await AppDataSource.getRepository(WishList).find({
      relations: ["user", "product"],
    });

    if (getWishlist) {
      return res.status(200).json({ data: getWishlist });
    } else {
      return res.status(400).json({ errorMessage: "No wishlist found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getWishlistById = async (req: Request, res: Response) => {
  try {
    const id: any = req.params.id;

    let getById = await AppDataSource.getRepository(WishList).findOne({
      where: { id },
      relations: ["user", "product"],
    });

    if (getById) {
      return res.status(200).json({ data: getById });
    } else {
      return res.status(400).json({ message: "No data found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteWishlist = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;

    const deletWishlist = await AppDataSource.getRepository(WishList).delete(
      id
    );

    if (deletWishlist.affected === 0 || !deletWishlist) {
      return res.status(400).json({ message: "Wishlist already deleted" });
    }
    return res.status(200).json({
      success: "Successfully deleted",
      message: `${deletWishlist.affected} row deleted`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
