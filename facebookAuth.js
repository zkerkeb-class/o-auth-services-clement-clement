import passport from 'passport';
import FacebookStrategy from 'passport-facebook';

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALL_BACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    // Vous pouvez ici enregistrer l'utilisateur dans votre base de données
    console.log(profile);
    return cb(null, profile);
  }
));