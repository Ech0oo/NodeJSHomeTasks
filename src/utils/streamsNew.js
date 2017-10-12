const minimist = require('minimist');
const fs = require('fs');
const through2 = require('through2');
const split = require('split');

class Streams {
    constructor() {
        console.log("Stream onj creation");
        this.HELP_MESSAGE = "Help message";
        this.printHelpMessage();
    }

    printHelpMessage() {
        console.log(this.HELP_MESSAGE);
    };
}

module.exports.Streams = Streams;