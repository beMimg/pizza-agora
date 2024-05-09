import { adminModel } from "../models/admin";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import "dotenv/config";

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESSTOKEN_KEY,
};

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

export const authJwt = passport.authenticate("jwt", { session: false });
