const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");

const GOOGLE_CALLBACK_URL = "http://localhost:8000/api/v1/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
      };

      const user = await User.findOneOrCreate(
        { googleId: profile.id },
        defaultUser
      ).catch((error) => {
        console.log("Error signing up ", error);
        cb(error, null);
      });

      if (user) return cb(null, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log("Serializing user: ", user);
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.findOne({ id }).catch((error) => {
    console.log("Error deserializing ", error);
    cb(error, null);
  });

  if (user) cb(null, user);
});
