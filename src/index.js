const appconfig = require("./../config/application.json");
const {Product, User} = require("./models/model");
const {DirWatcher} = require("./modules/DirWatcher");
const {Importer} = require("./modules/Importer");

console.log("The name of the application is: " + appconfig.name);
new Product();
new User("My user module");

const path = "data";
const daley = 5000;
const fullPath =  __dirname + "\\" + path;
const bAsyncImport = true; // toggle sync/async import

const importer = new Importer();
const dirWatcher = new DirWatcher();

dirWatcher.watch(fullPath, daley);

dirWatcher.on("fileChanged", (arrPath) => {
    arrPath.forEach((path) => {
        if(bAsyncImport) {
            importer.import(path)
            .then((jsonObject) => { console.log(jsonObject); });
        } else {
            const jsonObject = importer.importSync(path);
            console.log(jsonObject);
        }
    });
});