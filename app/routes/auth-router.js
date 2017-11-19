import express from "express";
import bodyParser from "body-parser";
import {validateSchema, postFindUser} from "../controllers/auth-controller";

const authRouter = express.Router();

authRouter.use("/", bodyParser.json());
authRouter.use("/", validateSchema("user-auth"));

authRouter.route('/')
    .post(postFindUser);

export {authRouter};