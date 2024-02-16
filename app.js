import express from 'express';
import session from 'express-session';
import passport from 'passport';
import {configureOIDCStrategy} from './config.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT;

// Configuration de la session
app.use(
  session({
    secret: 'LeaPassionCheval',
    resave: true,
    saveUninitialized: true,
  }),
);

// Initialisation de Passport pour l'authentification
app.use(passport.initialize());
app.use(passport.session());

// Configuration pour Google
configureOIDCStrategy(app, 'google', {
  issuer: 'https://accounts.google.com',
  authorizationURL: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenURL: 'https://oauth2.googleapis.com/token',
  userInfoURL: 'https://openidconnect.googleapis.com/v1/userinfo',
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/callback/google',
  scope: 'openid profile email',
});
configureOIDCStrategy(app, 'github', {
  issuer: 'https://github.com/',
  authorizationURL: 'https://github.com/login/oauth/authorize',
  tokenURL: 'https://github.com/login/oauth/access_token',
  userInfoURL: 'https://api.github.com/user',
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/callback/github',
  scope: 'user:email',
});

configureOIDCStrategy(app, 'facebook', {
  issuer: 'https://www.facebook.com',
  authorizationURL: 'https://www.facebook.com/v13.0/dialog/oauth',
  tokenURL: 'https://graph.facebook.com/v13.0/oauth/access_token',
  userInfoURL: 'https://graph.facebook.com/me',
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: 'https://3532-2001-861-388a-5450-549b-c28d-d75c-47d8.ngrok-free.app/callback/facebook',
  scope: 'openid profile email',
});
// Route d'authentification
//app.get('/auth', passport.authenticate('openidconnect'));
app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/logout', (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } //Redirigel'utilisateurverslapaged'accueilaprèsladéconnexion
    res.redirect('/');
  });
}); // Lancez le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
