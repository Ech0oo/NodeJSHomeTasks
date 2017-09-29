import fs from 'fs';

class Files {
    constructor(name, extension, size, changed) {
        this.moduleName = "Files module";
        console.log(this.moduleName);
    }

    scanDir(path) {
        console.log("Scanning directory.. ", path);
        let that = this;
        let fileList = {};
        return new Promise (function (resolve, reject) {
            fs.readdir(path, function(err, files) {
                console.log("Files in the folder: \n", files);
                if (err) reject(err);
                if (files.length) {
                    for (let i = 0; i < files.length; i++) {
                        let fullPath = path + "\\" + files[i];
                        let itemStat = fs.statSync(fullPath);
                        fileList[files[i]] = {
                            "fileName": files[i],
                            "fileSize": itemStat.size,
                            "fileChanged": itemStat.mtime
                        };
                    }
                    resolve(fileList);
                }
            })
        });
    }

    compareLists(prevList, newList) {
        console.log("Compare lists.. ");
        const that = this;
        let changedFileList = []; // names of files that was changed
        for (let fileName in newList) {
            if (newList.hasOwnProperty(fileName)) {
                if (prevList[fileName]) {
                    let newItem = newList[fileName];
                    let prevItem = prevList[fileName];
                    if (JSON.stringify(prevItem) !== JSON.stringify(newItem)) {
                        changedFileList.push(fileName);
                    };
                }
            }
        }
        return changedFileList;
    }
}

module.exports.Files = Files;