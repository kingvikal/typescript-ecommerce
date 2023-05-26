import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import userRoute from "./Routes/userRoute";
import categoryRoute from "./Routes/categoryRoute";
import productRoute from "./Routes/productRoute";
import orderRoute from "./Routes/orderRoute";
import orderItemRoute from "./Routes/orderItemRoute";
import paymentRoute from "./Routes/paymentRoute";
import wishlistRoute from "./Routes/wishlistRoute";

import cartRoute from "./Routes/cartRoute";
import { dbConnect } from "./database/dbConnect";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);
app.use("/orderItem", orderItemRoute);
app.use("/payment", paymentRoute);
app.use("/wishlist", wishlistRoute);
app.use("/cart", cartRoute);

dbConnect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
