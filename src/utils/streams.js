const minimist = require('minimist');
const fs = require('fs');
const through2 = require('through2');
const csv = require('csvtojson');
const split = require('split');
const Readable = require('readable-stream').Readable;
const path = require('path');
const request = require('request');

const args = minimist(process.argv.slice(2));
const WRONG_MESSAGE = "Wrong input!";
const HELP_MESSAGE =
        `Go to folder: >cd src\\utils\nRun command: >node streams.js --action csvtojson --file ./../data/MOCK_DATA.csv
        Action list:
        -readFile (node streams.js --action readFile --file ./../data/MOCK_DATA.csv),
        -toUpperCase (node streams.js --action toUpperCase --file ./../data/MOCK_DATA.csv),
        -transformToJSON (>node streams.js --action transform --file ./../data/MOCK_DATA.csv),
        -help (>node streams.js --action help),
        -saveToFileJSON (>node streams.js --action csvtojson --file ./../data/MOCK_DATA.csv)
        -cssBundler (>node streams.js --action cssBundler --file ./../data)`;

const methodObject = {
    readFile: inputOutput,
    toUpperCase: transformFile,
    transform: transform,
    help: printHelpMessage,
    csvtojson: fromCSVToJSON,
    cssBundler: cssBundler,
    httpClient: httpClient,
    httpServer: httpServer
};

let action = args.action || args.a;
let file = args.file || args.f;
let help = args.help || args.h;


if (help) {
    console.log(HELP_MESSAGE);
    return;
}

if (action && methodObject[action]) {
    if (file) {
        methodObject[action](file);
    } else {
        methodObject[action]();
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

/**
 * transform file to Uppercase
 */
function transformFile(filePath) {
    const readable = fs.createReadStream(filePath);
    readable.pipe(toUpperCase()).pipe(process.stdout);
};

/**
 * transfomator function, toUpperCase 
 */
function toUpperCase() {
    return through2.obj(function (data, enc, cb) {
        let chunk = data.toString().toUpperCase();
        cb(null, chunk);
    }); 
}

/* from csv to json*/
function transform(filePath) {
    const readable = fs.createReadStream(filePath);
    csv()
        .fromStream(readable)
        .pipe(process.stdout)
        .on('json', (jsonObj, rowIndex) => {
            console.log(jsonObj);
        });
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

/**
 * read csv file and save it as a json file with the same name
 */
function fromCSVToJSON(filePath) {
    const fileName = path.parse(filePath);
    const readable = fs.createReadStream(filePath);
    const writable = fs.createWriteStream('..\\data\\' + fileName.name + '.json');

    readable.pipe(split()).pipe(parseCSV()).pipe(toJSON()).pipe(writable);

    readable.on('end', () => {
        console.log("\nFile " + fileName.name + ".json is created.");
    });
}

/**
 * read all css files in the folder
 */
function _readDir(dirName) {
    return new Promise (function (resolve, reject) {
        fs.readdir(dirName, function(err, files) {
            if (err) reject(err);
            // filter files in the directory
            files = files.reduce(function (accum, file) {
                const aFileParts = file.split(".");
                const fileExt = aFileParts[aFileParts.length - 1];
                if (fileExt === "css" && file !== "bundle.css") {
                    accum.push(file);
                }
                return accum;
            }, []);
            resolve(files);
        });
    });
}

/**
 * create css bundle
 */
function cssBundler(dirPath) {
    _readDir(dirPath).then((files) => {
        const writable = fs.createWriteStream('..\\data\\bundle.css');
        files.forEach((file) => {
            const readable = fs.createReadStream(dirPath + "/" + file);
            readable.pipe(writable);
        });
        writable.on('finish', () => {
            const writable2 = fs.createWriteStream('..\\data\\bundle.css', {"flags":"a"});
            request('https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css').pipe(writable2);
        })
    });
}

function httpClient() { /* ... */ };
function httpServer() { /* ... */ };

function printHelpMessage() {
    console.log(HELP_MESSAGE);
};

const stream = methodObject;

module.exports.stream = stream;