import express from "express";
import {postGenerateToken} from "../controllers/auth-controller";
import {validateSchema} from "../helpers/auth-validator";
import {passport} from "../middlewares/passport-middleware";

const authRouter = express.Router();

authRouter.use("/", validateSchema("user-auth"));
authRouter.use("/", passport.authenticate('local', { session: false }));

authRouter.route('/')
    .post(postGenerateToken);

export {authRouter};