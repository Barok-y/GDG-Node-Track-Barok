import express from "express";
import cartRoutes from "./routes/cartRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";


const app = express();
app.use(express.json());

//Routes
app.use('/products',productRoutes);
app.use('/cart',cartRoutes);
app.use('/orders',orderRoutes);

//errorHandler
app.use(errorHandler);

export  {app};
