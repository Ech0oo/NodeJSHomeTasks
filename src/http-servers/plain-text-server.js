const http = require('http');

// create a server and invoke the function on the 'request' event
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World');
}).listen(8081);