import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import {configureStrategies} from './src/services/authService.js';
import {authRoutes} from './src/routes/index.js';
import flash from 'connect-flash';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT;

// app.use(cors());

app.use(
  cors({
    origin: 'http://localhost:3000', // ou l'origine que vous voulez autoriser
    credentials: true,
  }),
);

// Configuration de la session
app.use(
  session({
    secret: 'LeaPassionCheval',
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(flash());

// Initialisation de Passport pour l'authentification
app.use(passport.initialize());
app.use(passport.session());

// Configuration des stratégies d'authentification
configureStrategies(app);

// Routes d'authentification
app.use('/auth', authRoutes);
app.get('/flash', function (req, res) {
  // Set a flash message by passing the key, followed by the value, to req.flash().
  req.flash('info', 'Flash is back!');
  res.redirect('/');
});

// Lancez le serveur
app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${process.env.PORT}`);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use((err, req, res, next) => {
  console.error('Passport error:', err);
  res.status(500).send('Authentication error');
});
