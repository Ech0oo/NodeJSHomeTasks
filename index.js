const appconfig = require("./config/application.json");
const models = require("./models/model");

console.log("The name of the application is: " + appconfig.name);
new models.Product;
new models.User("My user module");