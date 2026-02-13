import express from "express";
const router = express.Router();
import {createOrder, getAllOrders, getOrderById} from "../controller/orderController.js";

router.post("/orders",createOrder);
router.get("/orders",getAllOrders);
router.get("/orders/:id",getOrderById);

export default router;