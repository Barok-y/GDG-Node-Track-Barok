import express from "express";
import {getAllBooks,getSearch,getBookById,createBook,deleteById} from "../controllers/bookcontroller.js";

const router = express.Router();

//get requests
router.get("/books",getAllBooks);
router.get("/books/search",getSearch);
router.get("/books/:id",getBookById);

//post requests

router.post("/books",createBook);

//delete requests

router.delete("/books/:id",deleteById);

export default router;