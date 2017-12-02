import users from "../models/users.json";
import jwt from "jsonwebtoken";
import {authProp} from "../config/auth-properties";

function postGenerateToken(req, res, next) {
    const userData = req.body;

    const oUser = users.find((modelUser) => {
        return ((userData.userName === modelUser.name) && (userData.password === modelUser.password));
    });

    if (oUser) {
        const payload = {
            "userId": oUser.id
        };
        let token = jwt.sign(payload, authProp.secret, { expiresIn: 3000 });
        let oRes = {
            "code": 200,
            "message": "OK",
            "data": {
                "userName": oUser.userName,
                "email": oUser.email
            },
            "token": token
        };
		res.json(oRes);
    } else {
        res.status(404).send({"code": 404,"message": "Not Found","data": {}});
    }
}

export {
    postGenerateToken
};
