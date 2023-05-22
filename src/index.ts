import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import userRoute from "./Routes/userRoute";
import categoryRoute from "./Routes/categoryRoute";
import productRoute from "./Routes/productRoute";
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

dbConnect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
