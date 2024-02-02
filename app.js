import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import './googleAuth.js';
import './facebookAuth.js';
import './githubAuth.js';
const app = express();
const port = process.env.PORT;

const jwtSecret = process.env.JWT_SECRET;
app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}, // Notez que dans un environnement de production, vous devriez mettre ceci à true
  }),
);

app.use(passport.initialize());
app.use(passport.session());

if (!jwtSecret) {
  console.error("La clé secrète JWT n'est pas définie dans le fichier .env");
  process.exit(1);
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.get(
  '/auth/google',
  passport.authenticate('google', {scope: ['profile', 'email']}),
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {failureRedirect: '/login'}),
  function (req, res) {
    // L'utilisateur a été authentifié avec succès.
    // Vous pouvez ici créer un JWT et le renvoyer au client.
    console.log('connecté');
    res.redirect('/');
  },
);

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/login'}),
  function (req, res) {
    // L'utilisateur a été authentifié avec succès.
    // Vous pouvez ici créer un JWT et le renvoyer au client.
    res.redirect('/');
  },
);
app.get('/auth/github', passport.authenticate('github'));

app.get(
  '/auth/github/callback',
  passport.authenticate('github', {failureRedirect: '/login'}),
  function (req, res) {
    // L'utilisateur a été authentifié avec succès.
    // Vous pouvez ici créer un JWT et le renvoyer au client.
    res.redirect('/');
  },
);
app.get('/logout', (req, res) => {
  req.logout(() => {});
  res.redirect('/');
  console.log('déconnecté');
});
