const http = require('http');
const fs = require('fs');
const qs = require('qs');
let arrayUserInfo = [];

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./views/index.html', "utf-8", (err, data) => {
            if (err) {
                console.log(err)
            }
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end()
        })
    } else {
        let data = ""
        req.on("data", chunk => {
            data += chunk;
        });
        req.on("end", () => {
            data = qs.parse(data)
            arrayUserInfo.push(data)
            fs.readFile('./views/display.html', "utf-8", (err, dataHTML) => {
                if (err) {
                    console.log(err)
                }
                res.writeHead(200, {'Content-Type': 'text/html'})
                dataHTML = dataHTML.replace('{name}', data.name)
                res.write(dataHTML)
                res.end()
            })
            console.log(arrayUserInfo)
        })
    }
})
server.listen(8080, 'localhost', () => {
    console.log(`Server is running at http://localhost:8080`)
})