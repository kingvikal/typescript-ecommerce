import { Router } from "express";
import {
  createCart,
  deleteCart,
  getAllCart,
  getCartById,
  updateCart,
} from "../Controllers/cartController";
import { IsUser } from "../Middlewares/isUser";
import { isAdmin } from "../Middlewares/isAdmin";

const router = Router();

router.post("/createCart", IsUser, createCart);
router.get("/getAll", IsUser, isAdmin, getAllCart);
router.get("/getById/:id", IsUser, isAdmin, getCartById);
router.put("/update/:id", IsUser, updateCart);
router.delete("/delete/:id", IsUser, deleteCart);

export default router;

