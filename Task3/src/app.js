import express from "express";
import bookRoutes from "./routes/bookRoutes.js";
import {errorHandler} from "./middleware/errorHandler.js";
import morgan from "morgan";

export const app = express();

//MiddleWare 
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/",bookRoutes);

//Error handling from the middleWare
app.use(errorHandler);
