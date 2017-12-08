import Sequelize from "sequelize";
import dbConfig from "../config/db-config.json";
const sequelize = new Sequelize(dbConfig.development.database, dbConfig.development.username, dbConfig.development.password, {
    host: "localhost",
    dialect: "postgres"
});


const Products = sequelize.define('Products',
    {
        name: {
            type: Sequelize.STRING
        },
        modelId: {
            type: Sequelize.INTEGER
        }
    });
const Users = sequelize.define('Users',
    {
        name: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        }
    });
const Reviews = sequelize.define('Reviews',
    {
        review: {
            type: Sequelize.TEXT
        }
    });
console.log("MODELS!!!!!!!!!!!!!", sequelize.models);

sequelize.sync();

export {sequelize, Sequelize};