const http = require('http');
const fs = require('fs');
const qs = require('qs');
const {parse} = require("qs");
const {ToWords} = require('to-words');
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./views/index.html', "utf-8", (err, data) => {
            if (err) {
                // res.writeHead(404,'Content-Type')
                console.log(err.message)
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data);
                res.end()
            }
        })
    } else {
        let data = ""
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            data = qs.parse(data)
            fs.readFile('./views/index.html', "utf-8", (err, dataHTML) => {
                res.writeHead(200, {'Content-Type': 'text/html'})
                const toWords = new ToWords();
                let result = toWords.convert(data.inputNumber);
                dataHTML = dataHTML.replace('<span id="result">', '<span id="result">' + result)
                res.write(dataHTML);
                res.end()
            })
        })
    }
})
server.listen(8080, 'localhost', () => {
    console.log('Server is running at http://localhost:8080')
})