import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  getProductById,
} from "../Controllers/productController";
import { IsUser } from "../Middlewares/isUser";
import { isAdmin } from "../Middlewares/isAdmin";

const router = Router();

router.post("/create", IsUser, isAdmin, createProduct);
router.get("/getAll", IsUser, getAllProduct);
router.get("/getById/:id", IsUser, getProductById);
router.put("/update/:id", IsUser, isAdmin, getProductById);

export default router;
