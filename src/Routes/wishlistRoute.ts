import { Router } from "express";
import {
  createWishlist,
  deleteWishlist,
  getWishlist,
  getWishlistById,
} from "../Controllers/wishlistController";
import { IsUser } from "../Middlewares/isUser";
import { isAdmin } from "../Middlewares/isAdmin";

const router = Router();

router.post("/create", IsUser, createWishlist);
router.get("/getWishlist", IsUser, isAdmin, getWishlist);
router.get("/getById/:id", IsUser, isAdmin, getWishlistById);
router.delete("/deleteById/:id", IsUser, deleteWishlist);

export default router;
