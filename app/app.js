import {consolePrintRandomDocument} from "./middlewares/random-document";
import {parsedQuery} from "./middlewares/query-parser";
import {apiRouter} from "./routes/api-router";
import bodyParser from "body-parser";
import {addCities} from "./models/db-utils";
import * as rootController from "./controllers/root-controller";

const express = require('express');
const app = express();

export {app, apiRouter, parsedQuery, bodyParser, addCities, consolePrintRandomDocument, rootController};