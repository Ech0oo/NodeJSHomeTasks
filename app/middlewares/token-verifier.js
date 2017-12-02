import jwt from "jsonwebtoken";
import {authProp} from "../config/auth-properties";

export const verifyToken = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (token) {
        jwt.verify(token, authProp.secret, function(err, decoded) {
            if (err) {
                res.json({ success: false, message: "Failed to authenticate token." });
            } else {
                next();
            }
        });
    } else {
        res.status(403).send({ success: false, message: "No token provided." });
    }
}