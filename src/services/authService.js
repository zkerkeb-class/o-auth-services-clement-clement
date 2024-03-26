import passport from 'passport';
import {configureOIDCStrategy} from '../../config.js';

export function configureStrategies(app) {
  //Configuration pour Google
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
    scope: 'user',
  });

  configureOIDCStrategy(app, 'linkedin-oidc', {
    issuer: 'https://www.linkedin.com',
    authorizationURL: 'https://www.linkedin.com/oauth/v2/authorization',
    tokenURL: 'https://www.linkedin.com/oauth/v2/accessToken',
    userInfoURL: 'https://api.linkedin.com/v2/me',
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: process.env.LINKEDIN_CALL_BACK_URL,
    scope: 'openid profile email',
  });

  configureOIDCStrategy(app, 'azuread', {
    issuer:
      'https://login.microsoftonline.com/common/v2.0/',
    authorizationURL:
      'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    tokenURL: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    userInfoURL: 'https://graph.microsoft.com/oidc/userinfo',
    clientID: process.env.AZUREAD_CLIENT_ID,
    clientSecret: process.env.AZUREAD_CLIENT_SECRET,
    callbackURL: process.env.AZUREAD_CALL_BACK_URL,
    scope: 'openid profile email',
  });
}
