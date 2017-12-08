import fs from "fs";
import path from "path";
import {sequelize, Sequelize} from "../models/postgres-db";

export const getProducts = (req, res) => {
    sequelize.model("Products").findAll().then(function(allProducts) {
        res.json(allProducts);
    });
};

export const getProductById = (req, res) => {
    const id = req.params.id;
    sequelize.model("Products").findById(id)
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
    const newProduct = {
        "name": req.body.name,
        "modelId": req.body.modelId,
    };

    sequelize.model("Products").create(newProduct)
    .then(function(newProduct) {
        res.json(newProduct);
    })
    .catch(function(error) {
        res.json(error);
    });
};

export const getProductReviewById = (req, res) => {
    const id = req.params.id;

    sequelize.model("Reviews").findById(id)
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
    sequelize.model("Users").findAll().then(function(allUsers) {
        res.json(allUsers);
    });
};

export const getNotFound = (req, res) => {
    res.status(404).send("Not Found 404");
};