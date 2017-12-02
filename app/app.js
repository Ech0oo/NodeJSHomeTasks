import {cookieParser} from "./middlewares/cookie-parser";
import {parsedQuery} from "./middlewares/query-parser";
import {apiRouter} from "./routes/api-router";
import {authRouter} from "./routes/auth-router";
import {passport} from "./middlewares/passport-middleware";
import bodyParser from "body-parser";
// import Sequelize from "sequelize";
import express from "express";
// import config from "db-config.json";

const app = express();
// const sequelize = new Sequelize(config.dbpostgres.database, config.dbpostgres.username, config.dbpostgres.password, {
//     host: config.dbpostgres.host,
//     dialect: config.dbpostgres.postgres,
//     operatorsAliases: false
// });

export {app, apiRouter, parsedQuery, cookieParser, authRouter, passport, bodyParser}