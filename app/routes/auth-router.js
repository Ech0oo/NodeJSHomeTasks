import express from "express";
import {postGenerateToken, gitHubCallback} from "../controllers/auth-controller";
import {validateSchema} from "../helpers/auth-validator";
import {passport} from "../middlewares/passport-middleware";

const authRouter = express.Router();

authRouter.route("/")
    .post(validateSchema("user-auth"), passport.authenticate("local", { session: false }), postGenerateToken);

authRouter.get("/github", passport.authenticate("github", { session: false }));
authRouter.get("/github/callback", gitHubCallback, postGenerateToken);

export {authRouter};