import {getRandomDocument} from "../models/db-utils";

export function consolePrintRandomDocument(req, res, next) {
    getRandomDocument();
};