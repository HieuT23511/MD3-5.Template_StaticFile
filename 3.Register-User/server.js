const http = require('http');
const fs = require('fs');
const qs = require('qs');
const server = http.createServer((req, res) => {
    if (req.method === "GET") {
        fs.readFile('./views/register.html', "utf-8", (err, data) => {
            res.writeHead(200, {'Content-Style': 'text/html'})
            res.write(data)
            res.end()
        })
    } else {
        let data = "";
        req.on('data',chunk => {
            data += chunk
        })
        req.on('end', ()=>{
            console.log(qs.parse(data));
            return res.end('Register success!')
        })
        req.on('error', ()=>{
            console.log('error')
        })
    }
})
server.listen(8080, 'localhost', () => {
    console.log(`Server is running at http://localhost:8080`)
})