import express from "express";
import {getProducts, postProducts, getProductById, getProductReviewById, getUsers} from "../controllers/api-controller";
import bodyParser from "body-parser";

const apiRouter = express.Router();

apiRouter.use("/products", bodyParser.json());
apiRouter.route('/products')
    .get(getProducts)
    .post(postProducts);
apiRouter.get('/products/:id', getProductById);
apiRouter.get('/products/:id/reviews', getProductReviewById);
apiRouter.get('/users', getUsers);

export {apiRouter};