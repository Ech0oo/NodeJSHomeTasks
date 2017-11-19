import products from "../models/products.json";
import reviews from "../models/reviews.json";
import users from "../models/users.json";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import authProp from "../config/auth-properties.json";

export const getProducts = (req, res) => {
    res.json(products);
};

export const getProductById = (req, res) => {
    const id = req.params.id;
    const product = products.find((element) => {
        return element.id === +id;
    });
    if (product === undefined) {
        res.status(400).send("Wrong id number!");
    } else {
        res.json(product.name);
    }
};

export const postProducts = (req, res) => {
    const productsPath = path.join(__dirname, "..", "models", "products.json");
    const newProduct = req.body;
    
    products.push(newProduct);
    fs.writeFile(productsPath, JSON.stringify(products));

    res.json(newProduct);
};

export const getProductReviewById = (req, res) => {
    const id = req.params.id;
    const review = reviews.find((element) => {
        return element.id === +id;
    });
    if (review === undefined) {
        res.status(400).send("Wrong id number!");
    } else {
        res.json(review.review);
    }
};

export const getUsers = (req, res) => {
    res.json(users);
};

export const getNotFound = (req, res) => {
    res.status(404).send("Not Found 404");
};

export const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, authProp.secret, function(err, decoded) {
            if (err) {
                res.json({ success: false, message: "Failed to authenticate token." });
            } else {
                next();
            }
        });
    } else {
        res.status(403).send({ success: false, message: "No token provided." });
    }
}