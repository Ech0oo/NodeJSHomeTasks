class Importer {
    constructor(name) {
        this.moduleName = "Importer module";
        console.log(this.moduleName);
    }

    onFileChange(data) {
        console.log("Importer reaction on change: ", data);
    }

    import(path) {
        return new Promise(function(resolve, reject){
            // data
        });
    }

    importSync(path) {
        // all data
    }
}

module.exports.Importer = Importer;