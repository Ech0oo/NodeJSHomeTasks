import express from "express";
import {getProducts, postProducts, getProductById, getProductReviewById, getUsers, getNotFound} from "../controllers/api-controller";
import {verifyToken} from "../middlewares/token-verifier";
import bodyParser from "body-parser";

const apiRouter = express.Router();

apiRouter.use("/products", bodyParser.json());
apiRouter.use(verifyToken);

apiRouter.route("/products")
    .get(getProducts)
    .post(postProducts);
apiRouter.get("/products/:id", getProductById);
apiRouter.get("/products/:id/reviews", getProductReviewById);
apiRouter.get("/users", getUsers);
apiRouter.get("*", getNotFound);

export {apiRouter};