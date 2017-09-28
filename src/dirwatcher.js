import fs from 'fs';
import {Files} from './files';

class DirWatcher {
    constructor(path = "\data", delay = 1) {
        this.moduleName = "DirWatcher";
        console.log(this.moduleName);
        this.oldList;

        this.files = new Files();
        this.watch(path, delay);

        this.subscribers = [];
    }

    watch(path, delay) {
        // implement function
        console.log("path: ", path);
        console.log("delay: ", delay);
        console.log("dirname: ", __dirname);
        const fullPath = __dirname + "\\" + path;
        console.log("fullPath: ", fullPath);
        this.files.scanDir(fullPath);

        fs.watch(fullPath, function(event, fileName) {
            console.log(fileName + " changed");
            // this.notify(" changed");
        });
    }

    subscribe(observer) {
        this.subscribers.push(observer);
        console.log("was subscribe ", this.subscribers);
    }

    unsubscribe(observer) {
        const index = this.subscribers.indexOf(observer)

        if (~index) {
            this.subscribers.splice(index, 1)
        }
    }

    notify(data) {
        this.subscribers.forEach(function (subscriber) {
            subscriber(data);
        });
    }
}

module.exports.DirWatcher = DirWatcher;