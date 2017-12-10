import Cities from "../models/cities-model";
import mongoose from "mongoose";

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/task7', {useMongoClient: true});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Mongoose is connected!!!");
});

// export async function printRandomDocument(req, res) {
//     try {
//         const docArr = await Cities.find().exec();
//         const max = docArr.length - 1;
//         const randomNumber = Math.floor(Math.random() * (max + 1));
//         res.json(docArr[randomNumber])
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }
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