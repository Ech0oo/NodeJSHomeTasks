const http = require("http");
const fs = require("fs");
const through2 = require('through2');
const path = require("path");


http.createServer((req, res) => {
    const filePath = path.join(__dirname,"index.html");
    
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    
    const newMessage = "Some text message.";
    // const indexFile = fs.readFileSync(path, {"encoding": "utf8"});
    // const newIndexFile = indexFile.replace("{message}", newMessage);
    // res.end(newIndexFile);

    const readable = fs.createReadStream(filePath);
    const setMassage = through2((data, utf8, callback) => {
        callback(null, data.toString().replace("{message}", newMessage));
    });

    readable.pipe(setMassage).pipe(res);
}).listen("8081");