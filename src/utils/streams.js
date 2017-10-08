const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
const WRONG_MESSAGE = "Wrong input!";
const HELP_MESSAGE = "Help message.";
const methodObject = {
    readFile: inputOutput(),
    transformFile: transformFile(),
    transform: transform(),
    httpClient: httpClient(),
    httpServer: httpServer(),
    help: printHelpMessage()
}

if (args.help) {
    console.log(HELP_MESSAGE)
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
    const readable = getReadableStreamSomehow();
    const writable = fs.createWriteStream('file.txt');
    // All the data from readable goes into 'file.txt'
    readable.pipe(writable);
    
};
function transformFile(filePath) { /* ... */ };
function transform() { /* ... */ };
function httpClient() { /* ... */ };
function httpServer() { /* ... */ };

function printHelpMessage() { 
    console.log(HELP_MESSAGE);
};

function log() { console.log("log"); };