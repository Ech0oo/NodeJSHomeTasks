import Sequelize from "sequelize";
import dbConfig from "../config/db-config.json";
import users from "./users.json";
import reviews from "./reviews.json";
import products from "./products.json";
const dbconnection = new Sequelize(dbConfig.development.database, dbConfig.development.username, dbConfig.development.password, {
    host: "localhost",
    dialect: "postgres"
});

// const Products = dbconnection.define('products', {
//     name: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     },
//     modelId: Sequelize.INTEGER,
// }, {
//     timestamps: false
// });

// const Users = dbconnection.define('users', {
//     name: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     },
//     password: Sequelize.STRING,
//     email: {
//         type: Sequelize.STRING,
//         unique: true,
//         allowNull: false
//     }
// }, {
//     timestamps: false
// });

// const Reviews = dbconnection.define('reviews', {
//     review: Sequelize.TEXT
// }, {
//     timestamps: false
// });

dbconnection.sync();
// dbconnection.sync({
//         force: true,
//         // logging: console.log
//     })
//     .then(function() {[
//         Users.bulkCreate(users),
//         Products.bulkCreate(products),
//         Reviews.bulkCreate(reviews)
//     ]})
//     .catch(function(error) {
//         console.log(error);
//     });

export {dbconnection};