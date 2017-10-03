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
        setInterval(() => {
            // scan dir
            Files.scanDir(fullPath)
                .then((newList) => {
                    console.log("List of files was received.");
                    // get list of changed files
                    if(this.filesList) {
                        this.changedFilesList = Files.compareLists(this.filesList, newList);
                    }
                    if (this.changedFilesList.length) {
                        console.log("There were changes!!!", this.changedFilesList);
                        const arrPath = this.changedFilesList.map( (fileName) => { return fullPath + "\\" + fileName });
                        this.emit("fileChanged", arrPath);
                    } else {
                        console.log("No changes!");
                    }
                    this.filesList = newList;
                });
        }, delay);
    }
}

module.exports.DirWatcher = DirWatcher;