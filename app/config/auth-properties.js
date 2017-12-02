const authProp = {
    "secret": "secretString",
    "facebook": {
        "clientID": process.env.FACEBOOK_ID,
        "clientSecret": process.env.FACEBOOK_CLIENT,
        "callbackURL": "http://localhost:8081/api/products"
    }
};

export {authProp};