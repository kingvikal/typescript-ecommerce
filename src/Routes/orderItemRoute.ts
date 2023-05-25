import { Router } from "express";
import { IsUser } from "../Middlewares/isUser";
import {
  createOrderItem,
  deleteOrderItem,
  getAllOrderItem,
  getOrderItemById,
  updateOrderItem,
} from "../Controllers/orderItemController";
import { isAdmin } from "../Middlewares/isAdmin";

const router = Router();

router.post("/create", IsUser, createOrderItem);
router.get("/getAll", IsUser, isAdmin, getAllOrderItem);
router.get("/getById/:id", IsUser, isAdmin, getOrderItemById);
router.put("/update/:id", IsUser, updateOrderItem);
router.put("/delete/:id", IsUser, deleteOrderItem);

export default router;
