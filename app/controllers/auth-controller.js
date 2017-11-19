import users from "../models/auth.json";
import authSchema from "../config/auth-schema.json";
import Ajv from "ajv";

const ajv = new Ajv({allErrors: true});
ajv.addSchema(authSchema, "user-auth");

function validateSchema(schemaName) {
    return (req, res, next) => {
        const isValid = ajv.validate(schemaName, req.body);
        isValid ? next() : res.status(400).json(errorResponse(ajv.errors));
    }
};

function errorResponse(schemaErrors) {
    const aErrors = schemaErrors.map((oError) => {
        return {
            path: oError.dataPath,
            message: oError.message
        };
    });
    return {
        status: "faild",
        errors: aErrors
    }
}

function postFindUser(req, res, next) {
    const userData = req.body;
    const isExist = users.find((modelUser) => {
        return ((userData.userName === modelUser.userName) && (userData.password === modelUser.password));
    });

    isExist ? res.send("Access is allowed!") : res.status(403).send("Wrong user name or password");
    next();
}

export {
    validateSchema,
    postFindUser
};
