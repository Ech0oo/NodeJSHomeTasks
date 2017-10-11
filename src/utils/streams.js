const minimist = require('minimist');
const fs = require('fs');
const through2 = require('through2');
const csvjson = require('csvjson');

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
    return;
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
    readable.pipe(process.stdout);
    readable.on('end', () => {
        console.log("\nNo more chunks.");
    });
    // const writable = fs.createWriteStream('file.txt');
    // All the data from readable goes into 'file.txt'
    // readable.pipe(transform);
};

function transformFile(filePath) {
    const readable = fs.createReadStream(filePath);
    readable.pipe(through2(function (chunk, enc, callback) {
        let chunk2 = new Buffer(chunk.toString().toUpperCase());
        callback(null, chunk2);
     }))
    .pipe(process.stdout);

    readable.on('finish', function () {
      doSomethingSpecial()
    })
};

/* from csv to json*/
function transform() {
    const readable = fs.createReadStream(filePath);
    readable.pipe(through2(function (chunk, enc, callback) {
        let chunk2 = chunk.toString();
        const json = csvjson.toObject(chunk2);
        callback(null, json);
    }))
    .pipe(process.stdout);
};

function httpClient() { /* ... */ };
function httpServer() { /* ... */ };

function printHelpMessage() {
    console.log(HELP_MESSAGE);
};

function log() { console.log("log"); };