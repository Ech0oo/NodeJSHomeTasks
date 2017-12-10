import {parsedQuery} from "./middlewares/query-parser";
import {apiRouter} from "./routes/api-router";
import bodyParser from "body-parser";
import {addCities} from "./models/db-utils";
import * as rootController from "./controllers/root-controller";
import mongoose from "mongoose";

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/task7', {useMongoClient: true});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Mongoose is connected!!!");
});

const express = require('express');
const app = express();

export {app, apiRouter, parsedQuery, bodyParser, addCities, rootController};