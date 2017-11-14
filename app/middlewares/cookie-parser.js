export function cookieParser(req, res, next) {
    const sCookies = req.headers["cookie"];
    let parsedCookies = {};
    if (sCookies) {
        const aCookies = sCookies.split(";");

        parsedCookies = aCookies.reduce((accum, sCookie) => {
            const aCookie = sCookie.trim().split("=");
            accum[aCookie[0]] = aCookie[1];
            return accum;
        }, {});
    }
    req.parsedCookies = parsedCookies;

    next();
};