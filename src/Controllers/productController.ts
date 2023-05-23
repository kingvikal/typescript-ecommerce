import { Request, Response } from "express";
import { AppDataSource } from "../Utils/appDataSource";
import { Product } from "../Models/productEntity";
import { Category } from "../Models/categoryEntity";

const ProductRepository = AppDataSource.getRepository(Product);
const CategoryRepository = AppDataSource.getRepository(Category);

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const category: Category = await CategoryRepository.findOne({
      where: { id },
    });

    const { name, description, price } = req.body;

    const product: Product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;

    if (category) product.category = category;
    else return res.status(400).send("Invalid Category");

    if (!name || !description || !price) {
      return res.status(400).json({ message: "must fill all fields" });
    }
    await ProductRepository.save(product);

    return res
      .status(200)
      .json({ message: "Product created successfully", product });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const product = CategoryRepository;
    let data = await product.find({
      relations: ["product"],
    });

    if (data) {
      return res.status(200).json({ data: data });
    } else {
      return res.status(400).json("No product found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;

    let data = await ProductRepository.findOne({
      where: { id },
    });

    if (data) {
      return res.status(200).json({ data: data });
    } else {
      return res.status(400).json("Product Not Found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    let updateUser = await ProductRepository.update(
      { id },
      {
        name: name,
        description: description,
        price: price,
      }
    );
    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields must be filled" });
    }

    return res.status(200).json({
      message: "Product Updated",
      data: `${updateUser.affected} row updated`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;

    const deleteProduct = await ProductRepository.delete({ id });

    if (deleteProduct.affected === 0) {
      return res.status(400).json({ message: "Product already deleted" });
    }
    return res.status(200).json({ success: "Successfully deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
