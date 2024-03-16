import passport from 'passport';
import { Strategy as OIDCStrategy } from 'passport-openidconnect';
import { Strategy as GitHubStrategy } from 'passport-github2';

import dotenv from 'dotenv';
dotenv.config();
export function configureOIDCStrategy(app, name, config) {
  //GOOGLE 
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
        pkce: true,
      },
      (issuer, profile, cb) => {
        return cb(null, profile);
      },
    ),
  );

  //GITHUB
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALL_BACK_URL,
      },
      function (accessToken, refreshToken, profile, done) {
        // Vous pouvez utiliser le profil ici pour extraire les informations de l'utilisateur
        done(null, profile);
      },
    ),
  );

  // LINKEDIN
  passport.use(
    'linkedin-oidc',
    new OIDCStrategy(
      {
        issuer: 'https://www.linkedin.com/',
        authorizationURL: 'https://www.linkedin.com/oauth/v2/authorization',
        tokenURL: 'https://www.linkedin.com/oauth/v2/accessToken',
        userInfoURL: 'https://api.linkedin.com/v2/me',
        clientID: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        callbackURL: process.env.LINKEDIN_CALL_BACK_URL,
        scope: config.scope,
      },
      (issuer, profile, cb) => {
        return cb(null, profile);
      },
    ),
  );





}



passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});
