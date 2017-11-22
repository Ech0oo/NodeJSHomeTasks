import express from "express";
import bodyParser from "body-parser";
import {validateSchema, postGenerateToken} from "../controllers/auth-controller";
import {passport} from "../middlewares/passport-middleware";

const authRouter = express.Router();

authRouter.use("/", bodyParser.json());
// authRouter.use("/", validateSchema("user-auth"));
// authRouter.use("/", passport.authenticate('local', { session: false }));
authRouter.use("/", passport.authenticate('facebook', { session: false }));

authRouter.route('/');
    // .post(postGenerateToken);

export {authRouter};