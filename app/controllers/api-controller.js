import Products from "../models/products-model";
import Users from "../models/users-model";

export async function getProducts(req, res, next) {
    try {
        const products = await Products.find().exec();
        res.json(products);
    } catch (err) {
        res.status(500).json(err);
    }
    next();
};

export async function getProductsByModelId(req, res, next) {
    try {
        const modelId = req.params.id;
        
        const productArr = await Products.find().where("modelId").equals(modelId).exec();
        if (productArr === undefined) {
            res.status(400).send("Wrong id number!");
        } else {
            const names = productArr.map((product) => { return product.name; });
            res.json(names);
        }
    } catch (err) {
        res.status(500).json(err);
    }
    next();
};

export async function postProducts(req, res, next) {
    console.log("try to post DATA");
    const newProduct = req.body;
    try {
        const createdProduct = await Products.create(newProduct);
        res.json(createdProduct);
    } catch (err) {
        res.status(500).json(err);
    }
    next();
};

export async function getUsers(req, res, next) {
    try {
        const users = await Users.find().exec();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
    next();
};