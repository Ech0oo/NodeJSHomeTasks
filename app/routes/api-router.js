import express from "express";
import {getProducts, postProducts, getProductsByModelId, getUsers, getNotFound} from "../controllers/api-controller";
import {validateSchema} from "../helpers/product-validation";

const apiRouter = express.Router();

apiRouter.route('/products')
    .get(getProducts)
    .post(validateSchema("product-validation"), postProducts);
apiRouter.get('/products/:id', getProductsByModelId);
apiRouter.get('/users', getUsers);

export {apiRouter};