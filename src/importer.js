const {promisify} = require('util')
const fs = require('fs')
class Importer {
    constructor(name) {
        this.moduleName = "Importer module";
        console.log(this.moduleName);
    }

    import(arrPath) {
        console.log("Event!!!!!!!!!!!", arrPath);
        Promise.all(
            arrPath.map(function(path) {
                return new Promise(
                    function(resolve, reject) {
                        fs.readFile(path, function(err, data) {
                            // if (err) throw err;
                            const csvFile = data.toString().split('\n');
                            resolve(csvFile);
                        })
                    }
                )
            })
        ).then (function(arrCSVFiles) {
            console.log(arrCSVFiles);
            // convert to json function code
        })
    }

    importSync(path) {
        // all data
    }
}

module.exports.Importer = Importer;