const appconfig = require("./config/application.json");
const {Product, User} = require("./models/model");

console.log("The name of the application is: " + appconfig.name);
new Product;
new User("My user module");