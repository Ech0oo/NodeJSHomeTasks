import users from "../models/users.json";
import authSchema from "../config/auth-schema.json";
import Ajv from "ajv";
import jwt from "jsonwebtoken";
import authProp from "../config/auth-properties.json";

const ajv = new Ajv({allErrors: true});
ajv.addSchema(authSchema, "user-auth");

function validateSchema(schemaName) {
    return (req, res, next) => {
        const isValid = ajv.validate(schemaName, req.body);
        isValid ? next() : res.status(400).json(_errorResponse(ajv.errors));
    }
};

function _errorResponse(schemaErrors) {
    const aErrors = schemaErrors.map((oError) => {
        return {
            path: oError.dataPath,
            message: oError.message
        };
    });
    return {
        status: "failed",
        errors: aErrors
    }
}

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
    validateSchema,
    postGenerateToken
};
