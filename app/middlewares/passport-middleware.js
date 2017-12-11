import passport from "passport";
import users from "../models/users.json";
import {Strategy as LocalStrategy} from "passport-local";
import {Strategy as JwtStrategy} from "passport-jwt";
import {ExtractJwt} from "passport-jwt";
import {authProp} from "../config/auth-properties";
import {Strategy as FacebookStrategy} from "passport-facebook";

passport.use(new LocalStrategy({
    usernameField: "userName",
    passwordField: "password",
    session: false
}, function (username, password, done) {
    const oUser = users.find((modelUser) => {
        return ((username === modelUser.name) && (password === modelUser.password));
    });

    if (oUser) {
        done(null, oUser);
    } else {
        done(null, false, { "message": "Bad username/password combination" });
	}
  }
));

passport.use(new JwtStrategy({
    jwtFromRequest: function(req) {
        const token = req.headers["x-access-token"];
        return token;
    },
    secretOrKey: authProp.secret
}, function(jwt_payload, done) {
    if (jwt_payload) {
        // console.log(req.body);
        done(null, jwt_payload);
    }
}));

const opt = {
    clientID: authProp.facebook.clientID,
    clientSecret: authProp.facebook.clientSecret,
    callbackURL: authProp.facebook.callbackURL,
    session: false
};

passport.use(new FacebookStrategy(opt,
    function (accessToken, refreshToken, profile, done) {
        done(null, profile.id);
    }
));

export {passport};