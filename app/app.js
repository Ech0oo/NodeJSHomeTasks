import {consolePrintRandomDocument} from "./middlewares/random-document";
import {parsedQuery} from "./middlewares/query-parser";
import {apiRouter} from "./routes/api-router";
import bodyParser from "body-parser";
import {addCities} from "./models/db-utils";

const express = require('express');
const app = express();

export {app, apiRouter, parsedQuery, bodyParser, addCities, consolePrintRandomDocument};