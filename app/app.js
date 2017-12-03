import {cookieParser} from "./middlewares/cookie-parser";
import {parsedQuery} from "./middlewares/query-parser";
import {apiRouter} from "./routes/api-router";
import {authRouter} from "./routes/auth-router";
import {passport} from "./middlewares/passport-middleware";
import bodyParser from "body-parser";
import morgan from "morgan";
import express from "express";

const app = express();

export {app, apiRouter, parsedQuery, cookieParser, authRouter, passport, bodyParser, morgan}