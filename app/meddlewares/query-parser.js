export function parsedQuery(req, res, next) {
    req.parsedQuery = req.query;

    next();
};