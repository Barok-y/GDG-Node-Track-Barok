import express from "express";
const router = express.Router();
import {getCart, addItem, updateCartItems, deleteCartItem} from "../controller/cartController.js";

router.get("/",getCart);
router.post("/",addItem);
router.put("/",updateCartItems);
router.delete("/:productId",deleteCartItem);

export default router;