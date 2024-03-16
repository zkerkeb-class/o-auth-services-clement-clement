import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import {configureStrategies} from './src/services/authService.js';
import {authRoutes} from './src/routes/index.js';

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

// Configuration des stratégies d'authentification
configureStrategies(app);


// Routes d'authentification
app.use('/auth', authRoutes);

// Lancez le serveur
app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${process.env.PORT}`);
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use((err, req, res, next) => {
  console.error('Passport error:', err);
  res.status(500).send('Authentication error');
});