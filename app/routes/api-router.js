import express from "express";
import { getProducts, postProducts, getProductById, getProductReviewById, getUsers, getNotFound } from "../controllers/api-controller";
import { passport } from "../middlewares/passport-middleware";
import bodyParser from "body-parser";

const apiRouter = express.Router();

apiRouter.use(bodyParser.json());
apiRouter.use(passport.authenticate("jwt", { session: false }));

apiRouter.route("/products")
    .get(getProducts)
    .post(postProducts);
apiRouter.get("/products/:id", getProductById);
apiRouter.get("/products/:id/reviews", getProductReviewById);
apiRouter.get("/users", getUsers);
apiRouter.get("*", getNotFound);

export { apiRouter };