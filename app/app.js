import {parsedQuery} from "./middlewares/query-parser";
import {apiRouter} from "./routes/api-router";
import bodyParser from "body-parser";

const express = require('express');
const app = express();

export {app, apiRouter, parsedQuery, bodyParser}