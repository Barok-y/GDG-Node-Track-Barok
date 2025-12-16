import express from "express";
import url from "url";
const app=express();
const port=5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

let students=[
    {id:1,name:"Rahul",age:20,department:"CSE"},
    {id:2,name:"Raj",age:21,department:"ECE"},
    {id:3,name:"Ravi",age:22,department:"MECH"}
];

app.get("/home",(req,res)=>{
    res.status(200).type("text/HTML").send("<h1 style='color:green'>Welcome</h1>");
});

app.get("/about",(req,res)=>{
    res.status(200).type("text/plain").send("This is about Page!!");
});

app.get("/students/:studentId",(req,res)=>{
    const studentId = req.params.studentId;
    const department = url.parse(req.url,true).query.department;
    const student=students.filter((student)=>student.id==studentId && student.department==department);
    res.send(JSON.stringify(student));
});

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})