const authProp = {
    "secret": "secretString",
    "github": {
        "clientID": process.env.GITHUB_ID,
        "clientSecret": process.env.GITHUB_CLIENT,
        "callbackURL": "http://localhost:8081/auth/github/callback"
    }
};

export {authProp};