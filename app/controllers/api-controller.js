import products from "../models/products.json";
import reviews from "../models/reviews.json";
import users from "../models/users.json";
import fs from "fs";
import path from "path";
import {dbconnection, Products, Users, Reviews} from "../models/postgres-db"

export const getProducts = (req, res) => {
    Products.findAll().then(function(allProducts) {
        res.json(allProducts);
    });
};

export const getProductById = (req, res) => {
    const id = req.params.id;
    Products.findById(id)
        .then(function(product) {
            if (product) {
                res.json(product.name);
            } else {
                res.status(400).send("Wrong id number!");
            }
        })
        .catch(function(error) {
            res.json(error);
        });
};

export const postProducts = (req, res) => {
    const newProduct = req.body;
    Products.create({
        name: newProduct.name.trim(),
        modelId: newProduct.modelId
    })
    .then(function(newProduct) {
        res.json(newProduct);
    })
    .catch(function(error) {
        res.json(error);
    });
};

export const getProductReviewById = (req, res) => {
    const id = req.params.id;

    Reviews.findById(id)
        .then(function(product) {
            if (product) {
                res.json(product.name);
            } else {
                res.status(400).send("Wrong id number!");
            }
        })
        .catch(function(error) {
            res.json(error);
        });
};

export const getUsers = (req, res) => {
    Users.findAll().then(function(allUsers) {
        res.json(allUsers);
    });
};

export const getNotFound = (req, res) => {
    res.status(404).send("Not Found 404");
};