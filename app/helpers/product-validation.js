import productSchema from "../config/product-schema.json";
import Ajv from "ajv";

const ajv = new Ajv({allErrors: true});
ajv.addSchema(productSchema, "product-validation");

function validateSchema(schemaName) {
    return (req, res, next) => {
        console.log("body!!!!", req.body);
        const isValid = ajv.validate(schemaName, req.body);
        console.log(isValid);
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

export {validateSchema};