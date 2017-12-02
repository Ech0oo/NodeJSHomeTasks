import authSchema from "../config/auth-schema.json";
import Ajv from "ajv";

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

export {
    validateSchema
};