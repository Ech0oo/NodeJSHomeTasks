import Sequelize from "sequelize";
import dbConfig from "../config/db-config.json";
const sequelize = new Sequelize(dbConfig.development.database, dbConfig.development.username, dbConfig.development.password, {
    host: "localhost",
    dialect: "postgres"
});

sequelize.import("./products");
sequelize.import("./reviews");
sequelize.import("./users");

sequelize.sync();

export {sequelize, Sequelize};