import fs from 'fs';
import {EventEmitter} from 'events';
import {Files} from './files';

class DirWatcher extends EventEmitter {
    constructor() {
        super();
        this.moduleName = "DirWatcher";
        console.log(this.moduleName);
        this.filesList = null;
        this.changedFilesList = [];
    }

    watch(fullPath, delay) {
        const that = this;
        const files = new Files();
        setInterval(function() {
            // scan dir
            files.scanDir(fullPath)
                .then(function(newList) {
                    console.log("List of files was received");
                    // get list of changed files
                    if(that.filesList) {
                        that.changedFilesList = files.compareLists(that.filesList, newList);
                    }
                    if (that.changedFilesList.length) {
                        console.log("Were changes!!!", that.changedFilesList);
                        const arrPath = that.changedFilesList.map( (fileName) => { return fullPath + "\\" + fileName });
                        that.emit("fileChanged", arrPath);
                    } else {
                        console.log("No changes!");
                    }
                    that.filesList = newList;
                });
        }, delay);
    }
}

module.exports.DirWatcher = DirWatcher;