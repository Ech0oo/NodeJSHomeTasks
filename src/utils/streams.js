const minimist = require('minimist');
const fs = require('fs');
const through2 = require('through2');
const csv = require('csvtojson');
const split = require('split');
const Readable = require('readable-stream').Readable;

const args = minimist(process.argv.slice(2));
const WRONG_MESSAGE = "Wrong input!";
const HELP_MESSAGE = "Please use command: >node streams.js --action csvtotxt --file ./../data/MOCK_DATA.csv\n Action list:\n-inputOutput,\n-readFile,\n-transformFile,\n-transform,\n-saveToFileJSON";
const methodObject = {
    readFile: inputOutput,
    transformFile: transformFile,
    transform: transform,
    httpClient: httpClient,
    httpServer: httpServer,
    saveToFileJSON: saveToFileJSON,
    help: printHelpMessage,
    csvtotxt: fromCSVToJSON
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
 * transfomator function, csv to obj 
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

        // console.log(obj);
        return cb(null, obj);
    });
};
/**
 * transfomator function, obj to json
 */
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


function fromCSVToJSON(filePath) {
    const readable = fs.createReadStream(filePath);
    const writable = fs.createWriteStream('..\\data\\file.txt');
    readable.pipe(split()).pipe(parseCSV()).pipe(toJSON()).pipe(writable);

    readable.on('end', () => {
        console.log("\nFile file.txt created.");
    });
}

function httpClient() { /* ... */ };
function httpServer() { /* ... */ };

function printHelpMessage() {
    console.log(HELP_MESSAGE);
};

function log() { console.log("log"); };
const stream = methodObject;

module.exports.stream = stream;