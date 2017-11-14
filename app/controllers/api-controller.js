import products from "../models/products.json";
import reviews from "../models/reviews.json";
import users from "../models/users.json";
import fs from "fs";
import path from "path";

export const getProducts = (req, res) => {
    res.json(products);
    res.end();
};

export const getProductById = (req, res) => {
    const id = req.params.id;
    const product = products.find((element) => {
        return element.id === +id;
    });
    res.json(product.name);
    res.end();
};

export const postProducts = (req, res) => {
    const productsPath = path.join(__dirname, "..", "models", "products.json");
    const newProduct = req.body;
    
    products.push(newProduct);
    fs.writeFile(productsPath, JSON.stringify(products));

    res.status(200).json(newProduct);
};

export const getProductReviewById = (req, res) => {
    const id = req.params.id;
    const review = reviews.find((element) => {
        return element.id === +id;
    });
    res.json(review.review);
    res.end();
};

export const getUsers = (req, res) => {
    res.json(users);
    res.end();
};