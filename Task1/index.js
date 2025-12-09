const http= require('http');

const server= http.createServer((req,res)=>{
    if(req.method=="GET"){
    if( req.url=="/"){
        res.end("Welcome to the Home page");
    }
    else if(req.url=="/info"){
        res.end("This is the information Page");
    }
    else{
        res.end("404 Not Found!");
    }
    }
    else if(req.method=="POST"){
        let body=""
        req.on("data", chunk=>{
            body+=chunk.toString();
        });

        req.on("end",()=>{
            res.end(body);
        })
    }

});

server.listen(3000,()=>{
    console.log("this server is running on port 3000");
});