import { Router } from "express";
import { isAdmin } from "../Middlewares/isAdmin";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../Controllers/categoryController";
import { IsUser } from "../Middlewares/isUser";

const router = Router();

router.post("/create", IsUser, isAdmin, createCategory);
router.put("/update/:id", IsUser, isAdmin, updateCategory);
router.delete("/delete/:id", IsUser, isAdmin, deleteCategory);
router.get("/get", IsUser, isAdmin, getCategories);

export default router;
