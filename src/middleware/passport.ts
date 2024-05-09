import passport from "passport";
import { adminModel } from "../models/admin";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESSTOKEN_KEY,
};

// payload.sub contains the user._id
// null = no errors
passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await adminModel.findById(payload.sub);
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);
