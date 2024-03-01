import passport from 'passport';
import {configureOIDCStrategy} from '../../config.js';

export function configureStrategies(app) {
  // Configuration pour Google
  configureOIDCStrategy(app, 'google', {
    issuer: 'https://accounts.google.com',
    authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenURL: 'https://oauth2.googleapis.com/token',
    userInfoURL: 'https://openidconnect.googleapis.com/v1/userinfo',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALL_BACK_URL,
    scope: 'openid profile email',
  });
  configureOIDCStrategy(app, 'github', {
    issuer: 'https://github.com/',
    authorizationURL: 'https://github.com/login/oauth/authorize',
    tokenURL: 'https://github.com/login/oauth/access_token',
    userInfoURL: 'https://api.github.com/user',
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALL_BACK_URL,
    scope: 'user:email',
  });

  configureOIDCStrategy(app, 'facebook', {
    issuer: 'https://www.facebook.com',
    authorizationURL: 'https://www.facebook.com/v13.0/dialog/oauth',
    tokenURL: 'https://graph.facebook.com/v13.0/oauth/access_token',
    userInfoURL: 'https://graph.facebook.com/me',
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL:
      'https://3532-2001-861-388a-5450-549b-c28d-d75c-47d8.ngrok-free.app/callback/facebook',
    scope: 'openid profile email',
  });
}
