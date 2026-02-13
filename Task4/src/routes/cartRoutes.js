import express from "express";
const router = express.Router();
import {getCart, addItem, updateCartItems, deleteCartItem} from "../controller/cartController.js";

router.get("/cart",getCart);
router.post("/cart",addItem);
router.put("/cart",updateCartItems);
router.delete("/cart/:productId",deleteCartItem);

export default router;