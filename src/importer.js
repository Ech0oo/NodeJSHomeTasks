const fs = require('fs')
const csvjson = require('csvjson');
class Importer {
    constructor(name) {
        this.moduleName = "Importer module";
        console.log(this.moduleName);
    }

    import(path) {
        console.log("Async Event!!!!!!!!!!!", path);
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) throw err;
                const dataString = data.toString();
                const jsonObject = csvjson.toObject(dataString);
                resolve(jsonObject);
            })
        })
    }

    importSync(path) {
        console.log("Sync Event!!!!!!!!!!!", path);
        const dataString = fs.readFileSync(path).toString();
        const jsonObject = csvjson.toObject(dataString);
        return jsonObject;
    }
}

module.exports.Importer = Importer;