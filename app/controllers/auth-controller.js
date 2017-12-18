import users from "../models/users.json";
import jwt from "jsonwebtoken";
import {authProp} from "../config/auth-properties";
import {passport} from "../middlewares/passport-middleware";

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
                "userName": oUser.name,
                "email": oUser.email
            },
            "token": token
        };
        console.log("oRes!!", oRes);
		res.json(oRes);
    } else {
        res.status(404).send({"code": 404,"message": "Not Found","data": {}});
    }
}

function gitHubCallback(req, res, next) {
    passport.authenticate("github", function(err, user, info) {
        if (err) {
            return next(err); // will generate a 500 error
        }
        // Generate a JSON response reflecting authentication status
        if (! user) {
            return res.send({ success : false, message : 'authentication failed' });
        }
        // simulate parse json
        req.body.userName = user.name;
        req.body.password = user.password;
        next();
    })(req, res, next);
}

export {
    postGenerateToken,
    gitHubCallback
};
