const minimist = require('minimist');
const fs = require('fs');
const args = minimist(process.argv.slice(2));
const WRONG_MESSAGE = "Wrong input!";
const HELP_MESSAGE = "Please use command: node streams.js --action readFile --file ./../data/MOCK_DATA.csv";
const methodObject = {
    readFile: inputOutput,
    transformFile: transformFile,
    transform: transform,
    httpClient: httpClient,
    httpServer: httpServer,
    help: printHelpMessage
}

if (args.help) {
    console.log(HELP_MESSAGE);
}

if (args.action && methodObject[args.action]) {
    if (args.file) {
        methodObject[args.action](args.file);
    } else {
        methodObject[args.action]();
    }
} else {
    console.log(WRONG_MESSAGE);
}


function inputOutput(filePath) {
    const readable = fs.createReadStream(filePath);
    readable.on('data', function(chunk) {
        console.log(chunk);
    });
    readable.on('end', function() {
        console.log("no more chunks");
    });
    // const writable = fs.createWriteStream('file.txt');
    // All the data from readable goes into 'file.txt'
    // readable.pipe(transform);
};
function transformFile(filePath) { /* ... */ };
function transform() { /* ... */ };
function httpClient() { /* ... */ };
function httpServer() { /* ... */ };

function printHelpMessage() { 
    console.log(HELP_MESSAGE);
};

function log() { console.log("log"); };