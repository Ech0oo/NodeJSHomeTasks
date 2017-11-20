import passport from "passport";
import users from "../models/users.json";
import {Strategy as LocalStrategy} from "passport-local";
import {Strategy as JwtStrategy} from "passport-jwt";
import {ExtractJwt} from "passport-jwt";
import authProp from "../config/auth-properties.json";

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
        done(null, jwt_payload);
    }
}));

export {passport};