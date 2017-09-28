const appconfig = require("./../config/application.json");
const {Product, User} = require("./models/model");
const {DirWatcher} = require("./DirWatcher");
const {Importer} = require("./Importer");

console.log("The name of the application is: " + appconfig.name);
new Product;
new User("My user module");



const dirWatcher = new DirWatcher;
const importer = new Importer;

dirWatcher.subscribe(importer.onFileChange);