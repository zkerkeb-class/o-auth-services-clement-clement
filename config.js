import passport from 'passport';
import {Strategy as OIDCStrategy} from 'passport-openidconnect';
import {Strategy as GitHubStrategy} from 'passport-github2';
import dotenv from 'dotenv';
dotenv.config();
export function configureOIDCStrategy(app, name, config) {
  passport.use(
    name,
    new OIDCStrategy(
      {
        issuer: config.issuer,
        authorizationURL: config.authorizationURL,
        tokenURL: config.tokenURL,
        userInfoURL: config.userInfoURL,
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL,
        scope: config.scope,
      },
      (issuer, profile, cb) => {
        return cb(null, profile);
      },
    ),
  );
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/callback/github',
      },
      function (accessToken, refreshToken, profile, done) {
        // Vous pouvez utiliser le profil ici pour extraire les informations de l'utilisateur
        done(null, profile);
      },
    ),
  );

  app.get(
    `/callback/google`,
    passport.authenticate('google', {failureRedirect: 'http://localhost:3000'}),
    (req, res) => {
      // Votre logique de rappel ici
      console.log(req.user.name.givenName);

      if (req.user) {
        res.json({
          id: req.user.id,
          email: req.user.emails[0].value,
          firsName: req.user.name.givenName,
          lastName: req.user.name.familyName,
        });
      } else {
        res.redirect('http://localhost:3000');
      }
    },
  );

  app.get(
    '/callback/github',
    passport.authenticate('github', {failureRedirect: 'http://localhost:3000'}),
    function (req, res) {
      console.log(req.user);
      // Vous pouvez rediriger l'utilisateur ici après une authentification réussie

      if (req.user) {
        res.json({
          id: req.user.id,
          email: req.user.email,
          firsName: req.user.name,
        });
      } else {
        res.redirect('http://localhost:3000');
      }
    },
  );

  app.get(
    `/callback/facebook`,
    passport.authenticate('facebook', {
      failureRedirect: 'http://localhost:3000',
    }),
    (req, res) => {
      if (req.user) {
        res.json({
          id: req.user.id,
          email: req.user.emails[0].value,
          firstName: req.user.name.givenName,
          lastName: req.user.name.familyName,
        });
      } else {
        res.redirect('http://localhost:3000');
      }
    },
  );
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
