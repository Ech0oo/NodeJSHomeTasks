const appconfig = require("./../config/application.json");
const {Product, User} = require("./models/model");
const {DirWatcher} = require("./DirWatcher");
const {Importer} = require("./Importer");

console.log("The name of the application is: " + appconfig.name);
new Product();
new User("My user module");

const path = "data";
const daley = 5000;
const fullPath =  __dirname + "\\" + path;

const importer = new Importer();
const dirWatcher = new DirWatcher();

dirWatcher.watch(fullPath, daley);
dirWatcher.on("fileChanged", importer.import);