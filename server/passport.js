const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const FacebookTokenStrategy = require("passport-facebook-token");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const config = require("./configuration");
const User = require("./models/auth");
const bcrypt = require("bcryptjs");

// JSON WEB TOKENS STRATEGY
try {
  passport.use(
      new JwtStrategy(
          {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.JWT_SECRET,
          },
          async (payload, done) => {
            try {
              const user = await User.findById(payload.sub);
              if (!user) return done(null, false);
              done(null, user);
            } catch (error) {
              done(error, false);
            }
          }
      )
  );

// Google Strategy
  passport.use(
      "googleToken",
      new GooglePlusTokenStrategy(
          {
            clientID: config.oauth.google.clientID,
            clientSecret: config.oauth.google.clientSecret,
          },
          async (accessToken, refreshToken, profile, done) => {
            try {
              const existingUser = await User.findOne({ "google.id": profile.id });
              if (existingUser) {
                console.log("pochemyto proslo");
                return done(null, existingUser);
              } else {
                console.log("tyt crah");
                const newUser = new User({
                  method: "google",
                  google: {
                    id: profile.id,
                    email: profile.emails[0].value,
                  },
                  name: profile.displayName,
                });
                await newUser.save();
                console.log(`this is ${newUser}`);
                done(null, newUser);
              }
            } catch (error) {
              done(error, false, error.message);
            }
          }
      )
  );

//Facebook Strategy
  passport.use(
      "facebookToken",
      new FacebookTokenStrategy(
          {
            clientID: config.oauth.facebook.clientID,
            clientSecret: config.oauth.facebook.clientSecret,
          },
          async (accessToken, refreshToken, profile, done) => {
            try {
              console.log("profile", profile);
              console.log("accessToken", accessToken);
              console.log("refreshToken", refreshToken);

              const existingUser = await User.findOne({ "facebook.id": profile.id });
              if (existingUser) {
                return done(null, existingUser);
              }

              const newUser = new User({
                method: "facebook",
                facebook: {
                  id: profile.id,
                  email: profile.emails[0].value,
                },
                name: profile.displayName,
              });

              await newUser.save();
              done(null, newUser);
            } catch (error) {
              done(error, false, error.message);
            }
          }
      )
  );

// Local Strategy
  passport.use(
      new LocalStrategy(
          {
            usernameField: "email",
          },
          async (email, password, done) => {
            try {
              const user = await User.findOne({ "local.email": email });
              if (!user) return done(null, false);
              const passwordInDB = user.local.password;
              const isMatch = await bcrypt.compare(password, passwordInDB);
              if (!isMatch) {
                return done(null, false);
              }
              done(null, user);
            } catch (error) {
              done(error, false);
            }
          }
      )
  );
} catch (e) {
  console.log('i dont care');
}
