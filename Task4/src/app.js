import express from "express";
import cartRoutes from "./routes/cartRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import dotnev from "dotnev";
import connectDB from "./config/database.js";
const app = express();

export default app;
