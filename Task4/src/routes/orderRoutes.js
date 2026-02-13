import express from "express";
const router = express.Router();
import {createOrder, getAllOrders, getOrderById} from "../controller/orderController.js";

router.post("/",createOrder);
router.get("/",getAllOrders);
router.get("/:id",getOrderById);

export default router;