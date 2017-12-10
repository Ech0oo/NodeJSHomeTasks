import Cities from "../models/cities-model";
import Users from "../models/users-model";
import dataUsers from "../models/users.json";
import Products from "../models/products-model";
import dataProducts from "../models/products.json";
import mongoose from "mongoose";

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/task7', {useMongoClient: true});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Mongoose is connected!!!");
});

export async function printRandomDocument(req, res) {
    try {
        const docArr = await Cities.find().exec();
        const max = docArr.length - 1;
        const randomNumber = Math.floor(Math.random() * (max + 1));
        res.json(docArr[randomNumber])
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function addUsers(req, res, next) {
    try {
        const usersNumber = await Users.count().exec();
        if (!usersNumber) {
            const dUsers = await Users.create(dataUsers);
            console.log("The users were added.");
        } else {
            console.log("Users exist");
        }
    } catch (err) {
        res.status(500).json(err);
    }
    next();
}

export async function addProducts(req, res, next) {
    try {
        const usersNumber = await Products.count().exec();
        if (!usersNumber) {
            const dProducts = await Products.create(dataProducts);
            console.log("The products were added.");
        } else {
            console.log("The products collection exists");
        }
    } catch (err) {
        res.status(500).json(err);
    }
    next();
}