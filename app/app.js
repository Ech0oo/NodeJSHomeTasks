import {cookieParser} from "./middlewares/cookie-parser";
import {parsedQuery} from "./middlewares/query-parser";
import {apiRouter} from "./routes/api-router";

const express = require('express');
const app = express();

export {app, apiRouter, parsedQuery, cookieParser}