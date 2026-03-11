import { studentSchema } from "../Models/student";

export const getAllStudents = async (req, res, next) => {
    try{
        const allStudents = await studentSchema.find();
        res.json({
            message: "Students:",
            allStudents
        })
    }catch(Error){
        next(Error);
    }
}
export const getStudents = async (req, res, next) => {
    try{
        const name=req.query;
        const students = await studentSchema.find(name);
        res.json({
            message: `Students with name ${name}`,
            students
        })
    }catch(Error){
        next(Error);
    }
}
export const createStudent = async (req,res,next) => {
    try{
        const student = await studentSchema.create(req.query);
        res.status(201).json(student);
    }catch(Error){
        next(Error);
    }
}
export const updateStudent = async (req,res,next) => {
    try{
        const student = await studentSchema.findByIdAndUpdate(req.param.name,req.body, {new:true});
        if(!student){
            res.status(404);
            throw new Error("Student not Found");
        }
        res.json(student);
    }catch(Error){
        next(Error);
    }
}
export const deleteStudent = async (req,res,next) => {
    try{
        const student = await studentSchema.findBYAndDelete(req.param.name);
        if(!student){
            res.status(404);
            throw new Error("Student not found");
        }
        res.json({
            message: `Student with the name ${req.param.name} has been deleted!`,
            student
        })
    }catch(Error){
        next(Error);
    }
}
