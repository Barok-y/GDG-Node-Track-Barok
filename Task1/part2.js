const http= require('http');
const { json } = require('stream/consumers');
const url= require('url');

let students=[
    {
        id:1,
        name:"kaleab"
    },
    {
        id:2,
        name:"Barok"
    },
    {
        id:3,
        name:"Abel"
    }
]

const server= http.createServer((req,res)=>{
    if(req.method=="GET"){
        if(req.url=="/student"){
            res.end(JSON.stringify(students));
        }
    }
    else if(req.method=="POST"){
        let body=""
        req.on("data",chunk=>{
            body+=chunk.toString();
        })
        req.on("end",()=>{
            const name=JSON.parse(body).name;
            students.push({id:students.length,name:name});
            res.end(JSON.stringify(students))
        })
    }
    else if(req.method=="PUT"){
        if(url.parse(req.url,true).pathname=="/students"){
            let flag=false;
            const id= url.parse(req.url,true).query.id;
            const name = url.parse(req.url,true).query.name;
             students=students.map((student)=>{
                if(student.id == id){
                    flag=true;
                    console.log(id," ",name);
                    return {id:id,name:name};
                }
                return student;
            })
            if(flag!=true){
                res.statusCode(400).end("Your Id isn't found!");
            }
            else{
            res.end(JSON.stringify(students));
            }
        }
    }
    else if(req.method=="DELETE"){
        if(url.parse(req.url,true).pathname=="/students"){
             let flag=false;
            const id= url.parse(req.url,true).query.id;
            students=students.filter((student)=>{
                if(student.id!=id){
                    
                    return true;
                }
                else{
                    flag=true;
                    return false;
                }
            })
            if(flag!=true){
                res.statusCode(400).end("Your Id isn't found!");
            }
            else{
            res.end("Successfully Deleted, the new list is " +JSON.stringify(students));
            }
        }
    }
    else{
        res.statusCode(404).end("404 Not found!!");
    }

});

server.listen(4000,()=>{
    console.log("Running on 4000");
});