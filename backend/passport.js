import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";

const GOOGLE_CLIENT_ID =
  "570375514738-ffq4ahr9tfjtj24qtr3am4238525fl8q.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const FACEBOOK_APP_ID = "1045090863955729";
const FACEBOOK_APP_SECRET = "35918532149155a6509fe7ddb4d3f678";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// the url for facebook must use SSL and start with https
// this function is OK
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
