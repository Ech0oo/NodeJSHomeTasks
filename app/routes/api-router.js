import express from "express";
import {getProducts, postProducts, getProductsByModelId, getUsers, getNotFound} from "../controllers/api-controller";

const apiRouter = express.Router();

apiRouter.route('/products')
    .get(getProducts)
    .post(postProducts);
apiRouter.get('/products/:id', getProductsByModelId);
apiRouter.get('/users', getUsers);

export {apiRouter};