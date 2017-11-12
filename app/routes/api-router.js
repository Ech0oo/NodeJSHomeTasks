import express from "express";
import products from "../models/products.json";
import reviews from "../models/reviews.json";
import users from "../models/users.json"

const apiRouter = express.Router();

apiRouter.route('/products')
    .get((req, res) => {
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(`All products: ${JSON.stringify(products)}`);
    })
    .post((req, res) => {
        res.end('Products POST method page');
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