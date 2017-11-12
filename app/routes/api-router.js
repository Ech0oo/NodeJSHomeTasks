import express from "express";
import products from "../models/products.json";
import reviews from "../models/reviews.json";
import users from "../models/users.json";
import bodyParser from "body-parser";
import fs from "fs";

const apiRouter = express.Router();

apiRouter.use("/products", bodyParser.json());

apiRouter.route('/products')
    .get((req, res) => {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(`All products: ${JSON.stringify(products)}`);
    })
    .post((req, res) => {
        const productsPath = __dirname + "/../models/products.json";
        const newProduct = req.body;
        
        products.push(newProduct);
        fs.writeFile(productsPath, JSON.stringify(products));

        res.status(200).json(newProduct);
    });

apiRouter.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find((element) => {
        return element.id === +id;
    });
    req.product = JSON.stringify(product);
    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.end(`Product: ${req.product}`);
});

apiRouter.get('/products/:id/reviews', (req, res) => {
    const id = req.params.id;
    const review = reviews.find((element) => {
        return element.id === +id;
    });
    req.review = JSON.stringify(review.review);
    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.end(`Product review: ${req.review}`);
});

apiRouter.get('/users', function(req, res) {
    res.writeHead(200, {
        "Content-Type": "application/json"
    });
    res.end(`All users: ${JSON.stringify(users)}`);
});

export {apiRouter};