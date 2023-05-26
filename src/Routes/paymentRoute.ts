import { Router } from "express";
import { IsUser } from "../Middlewares/isUser";
import {
  createPayment,
  deletePayment,
  getPayment,
  getPaymentById,
} from "../Controllers/paymentController";
import { isAdmin } from "../Middlewares/isAdmin";

const router = Router();

router.post("/create", IsUser, createPayment);
router.get("/getAll", IsUser, isAdmin, getPayment);
router.get("/getById/:id", IsUser, isAdmin, getPaymentById);
router.get("/delete/:id", IsUser, deletePayment);

export default router;
