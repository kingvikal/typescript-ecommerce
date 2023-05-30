import { Request, Response } from "express";
import { Category } from "../Models/categoryEntity";
import { AppDataSource } from "../Utils/appDataSource";

const categoryRepository = AppDataSource.getRepository(Category);

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { categoryType } = req.body;

    const category = new Category();
    category.categoryType = categoryType;

    await categoryRepository.save(category);

    return res.status(200).json({ message: "category created successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const getCategories = await categoryRepository
      .createQueryBuilder("category")
      .getMany();

    if (getCategories) {
      return res.status(200).json({ data: getCategories });
    } else {
      return res.status(400).json([]);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id }: any = req.params;
    const { categoryType }: any = req.body;

    const updateCategory = await categoryRepository
      .createQueryBuilder("category")
      .update(Category)
      .set({ categoryType: categoryType })
      .where("category.id = :id", { id })
      .execute();

    if (!categoryType) {
      return res.status(400).json({ message: "categoryType must be provided" });
    }

    return res.status(200).json({
      message: "Category updated successfully",
      data: `${updateCategory.affected} row was updated`,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleteCategory = await categoryRepository
      .createQueryBuilder("category")
      .delete()
      .from(Category)
      .where("category.id = :id", { id })
      .execute();

    if (deleteCategory.affected == 0) {
      return res.status(400).json({ message: "Category already deleted" });
    }
    return res.status(200).json({ success: "Category Deleted Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
