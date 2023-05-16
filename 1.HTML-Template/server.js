const http  = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    fs.readFile('./templates/indexafda.html',"utf-8",(err,str)=>{
        if(err){
            res.writeHead(404,{'Content-Type':'text/html'})
            return res.end(`404 Not Found`);
        }
        res.writeHead(200,{'Content-Type':'text/html'})
        res.write(str)
        res.end()
    });

})
server.listen(8080,`localhost`,()=>{
    console.log(`Server is running in http://localhost:8080`)
})