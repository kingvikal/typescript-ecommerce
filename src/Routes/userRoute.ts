import { Router } from "express";
import {
  Login,
  Register,
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../Controllers/userController";
import { IsUser } from "../Middlewares/isUser";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/getAll", IsUser, getAllUser);
router.get("/getById/:id", IsUser, getUserById);
router.put("/update/:id", IsUser, updateUser);
router.delete("/delete/:id", IsUser, deleteUser);

export default router;
