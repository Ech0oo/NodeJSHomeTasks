const http = require("http");
const fs = require("fs");
const through2 = require('through2');


http.createServer((req, res) => {
    const path = __dirname + "/" + "index.html";
    
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    
    const newMessage = "Some text message.";
    // const indexFile = fs.readFileSync(path, {"encoding": "utf8"});
    // const newIndexFile = indexFile.replace("{message}", newMessage);
    // res.end(newIndexFile);

    readable = fs.createReadStream(path);
    const setMassage = through2((data, utf8, callback) => {
        callback(null, data.toString().replace("{message}", newMessage));
    });

    readable.pipe(setMassage).pipe(res);
}).listen("8081");