import {cookieParser} from "./middlewares/cookie-parser";
import {parsedQuery} from "./middlewares/query-parser";
import {apiRouter} from "./routes/api-router";
import {authRouter} from "./routes/auth-router";
import {passport} from "./middlewares/passport-middleware";

const express = require('express');
const app = express();

export {app, apiRouter, parsedQuery, cookieParser, authRouter, passport}