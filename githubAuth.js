import passport from 'passport';
import GitHubStrategy from 'passport-github';

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    // Vous pouvez ici enregistrer l'utilisateur dans votre base de données
    console.log(profile);
    return cb(null, profile);
  }
));
