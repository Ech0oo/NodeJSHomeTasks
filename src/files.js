import fs from 'fs';

class Files {
    constructor(name, extension, size, changed) {
        this.moduleName = "Files module";
        console.log(this.moduleName);
        this.fileList = {};
    }

    scanDir(path) {
        console.log("Files reaction on change: ", path);
        let that = this;
        fs.readdir(path, function(err, files) {
            console.log("Files in the folder: \n", files);
            if (err) throw err;
            if (files.length) {
                for (let i = 0; i < files.length; i++) {
                    let fullPath = path + "\\" + files[i];
                    let itemStat = fs.statSync(fullPath);
                    that.fileList[files[i]] = {
                        "fileName": files[i],
                        "fileSize": itemStat.size,
                        "fileChanged": itemStat.mtime
                    };
                    // console.log(itemStat);
                }
                console.log("old list of files", that.fileList);
            }
        })
    }
}

module.exports.Files = Files;