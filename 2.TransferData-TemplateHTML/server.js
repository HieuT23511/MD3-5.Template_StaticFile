const http = require('http')
const fs = require('fs');
const server = http.createServer((req, res) => {
    fs.readFile('./templates/index.html', "utf-8", (err, str) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'})
            return res.end('404 not found')
        }
        str = str.replace(`{username}`,'admin')
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(str)
        res.end()
    })
})
server.listen(8080, 'localhost', () => {
    console.log(`Server is running at http://localhost:8080`)
})