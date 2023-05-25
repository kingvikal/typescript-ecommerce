import { Router } from "express";
import { IsUser } from "../Middlewares/isUser";
import {
  createOrder,
  deletOrder,
  getOrder,
  getOrderById,
} from "../Controllers/orderController";
import { isAdmin } from "../Middlewares/isAdmin";

const router = Router();

router.post("/create", IsUser, createOrder);
router.get("/getOrder", IsUser, isAdmin, getOrder);
router.get("/getById/:id", IsUser, isAdmin, getOrderById);
router.delete("/deleteOrder/:id", IsUser, deletOrder);

export default router;
