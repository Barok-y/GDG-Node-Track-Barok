import express from "express";
const router = express.Router();
import {getAllStudents,getStudents,createStudent,updateStudent,deleteStudent} from "../Controller/studentController.js"

router.get('/', getAllStudents);
router.get('/:name', getStudents);
router.post('/', createStudent);
router.put('/:name', updateStudent);
router.delete('/:name', deleteStudent);

export default router;