import express from "express";
import {getProducts, postProducts, getProductById, getUsers, getNotFound} from "../controllers/api-controller";

const apiRouter = express.Router();

apiRouter.route('/products')
    .get(getProducts)
    .post(postProducts);
apiRouter.get('/products/:id', getProductById);
apiRouter.get('/users', getUsers);
apiRouter.get("*", getNotFound);

export {apiRouter};