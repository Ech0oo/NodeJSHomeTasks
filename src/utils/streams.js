const minimist = require('minimist');
const fs = require('fs');
const through2 = require('through2');
const csv = require('csvtojson');
const split = require('split');
const Readable = require('readable-stream').Readable;

const args = minimist(process.argv.slice(2));
const WRONG_MESSAGE = "Wrong input!";
const HELP_MESSAGE = "Please use command: >node streams.js --action readFile --file ./../data/MOCK_DATA.csv\n Action list:\n-inputOutput,\n-readFile,\n-transformFile,\n-transform,\n-saveToFileJSON";
const methodObject = {
    readFile: inputOutput,
    transformFile: transformFile,
    transform: transform,
    httpClient: httpClient,
    httpServer: httpServer,
    saveToFileJSON: saveToFileJSON,
    help: printHelpMessage,
    csvtoobj: fromCSVToObj
};

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
};

function transformFile(filePath) {
    const readable = fs.createReadStream(filePath);
    readable.pipe(through2(function (chunk, enc, callback) {
        let chunk2 = new Buffer(chunk.toString().toUpperCase());
        callback(null, chunk2);
     }))
    .pipe(process.stdout);
};

/* from csv to json*/
function transform(filePath) {
    const readable = fs.createReadStream(filePath);
    csv()
        .fromStream(readable)
        .pipe(process.stdout)
        .on('json', (jsonObj, rowIndex) => {
            console.log(jsonObj);
        })
        .on('done', () => {
            console.log('end')
        })
};

/**
 * transfomator function
 */
function parseCSV() {
    let templateKeys = [];
    let parseHeadline = true;
    return through2.obj((data, enc, cb) => {
        if (parseHeadline) {
            templateKeys = data.toString().split(',');
            parseHeadline = false;
            return cb(null, null);
        }

        const entries = data.toString().split(',');
        const obj = {};

        templateKeys.forEach((el, index) => {
            obj[el] = entries[index];
        });

        console.log(obj);
        return cb(null, obj);
    });
};

function toJSON() {
    let objs = [];
    return through2.obj(function (data, enc, cb) {
        objs.push(data);
        cb(null, null);
    }, function (cb) {
        this.push(JSON.stringify(objs));
        cb();
    });
};

function fromCSVToObj(filePath) {
    const readable = fs.createReadStream(filePath);

    readable.pipe(parseCSV()).pipe(process.stdout);

    readable.on('end', () => {
        console.log("\nNo more chunks.");
    });
}











/* from csv to txt file*/
function saveToFileJSON(filePath) {
    fs.createReadStream(filePath)
        .pipe(through2(
            function (chunk, enc, callback) { callback(null, chunk) },
            function (callback) {
                this.push();
                callback();
            }
        ))
        .pipe(through2(function (chunk, enc, callback) {
            let chunk2 = new Buffer(chunk.toString().toUpperCase());
            callback(null, chunk2);
         }))
        .pipe(fs.createWriteStream('..\\data\\file.txt'));
};

function httpClient() { /* ... */ };
function httpServer() { /* ... */ };

function printHelpMessage() {
    console.log(HELP_MESSAGE);
};

function log() { console.log("log"); };
const stream = methodObject;

module.exports.stream = stream;