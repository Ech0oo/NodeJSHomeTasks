"use strict";

var appconfig = require("./../config/application.json");

var _require = require("./models/model"),
    Product = _require.Product,
    User = _require.User;

var _require2 = require("./DirWatcher"),
    DirWatcher = _require2.DirWatcher;

var _require3 = require("./Importer"),
    Importer = _require3.Importer;

console.log("The name of the application is: " + appconfig.name);
new Product();
new User("My user module");

var dirWatcher = new DirWatcher();
var importer = new Importer();

dirWatcher.watch();