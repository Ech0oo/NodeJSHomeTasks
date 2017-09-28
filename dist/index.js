"use strict";

var appconfig = require("./../config/application.json");

var _require = require("./models/model"),
    Product = _require.Product,
    User = _require.User;

console.log("The name of the application is: " + appconfig.name);
new Product();
new User("My user module");