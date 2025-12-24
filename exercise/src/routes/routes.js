import express from "express";
import {getAllTasks,postTask,getTask} from "../controller/controller.js";

 const router=express.Router();

router.get("/todos",getAllTasks);
router.post("/todos",postTask);
router.get("/todos/:id",getTask)

export default router;