import passport from 'passport';

export function authenticate(provider) {
  return passport.authenticate(provider);
}

export function logout(req, res) {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
}

export const googleCallback = [
  passport.authenticate('google', {failureRedirect: process.env.URL}),
  (req, res) => {
    console.log(req.user.name.givenName);
    if (req.user) {
      res.json({
        id: req.user.id,
        email: req.user.emails[0].value,
        firsName: req.user.name.givenName,
        lastName: req.user.name.familyName,
      });
    } else {
      res.redirect(process.env.URL);
    }
  },
];

export const githubCallback = [
  passport.authenticate('github', {failureRedirect: process.env.URL}),
  (req, res) => {
    console.log(req.user);
    if (req.user) {
      res.json({
        id: req.user.id,
        email: req.user.email,
        firsName: req.user.name,
      });
    } else {
      res.redirect(process.env.URL);
    }
  },
];

export const linkedinCallback = [
  passport.authenticate('linkedin-oidc', {failureRedirect: process.env.URL}),
  (req, res) => {
    console.log('cui cui');
    console.log(req);
    if (req.user) {
      res.json({
        id: req.user.id,
        email: req.user.emails[0].value,
        firsName: req.user.name.givenName,
        lastName: req.user.name.familyName,
      });
    } else {
      console.log(req);
      res.redirect(process.env.URL);
    }
  },
];

// export const azureadCallback = [
//   passport.authenticate('azuread', {failureRedirect: process.env.URL}),
//   (req, res) => {
//     if (req.user) {
//       res.json({
//         id: req.user.id,
//         email: req.user.emails[0].value,
//         firstName: req.user.name.givenName,
//         lastName: req.user.name.familyName,
//       });
//     } else {
//       res.redirect(process.env.URL);
//     }
//   },
// ];

export const azureadCallback = [
  // Middleware personnalisé pour capturer les tentatives d'authentification.
  (req, res, next) => {
    passport.authenticate('azuread', (err, user, info) => {
      console.log('Azure AD callback response:', req);
      console.error('Passport authentication error:', err);
      if (err) {
        // Log l'erreur et redirige ou répond avec un message d'erreur.
        console.error('Authentication error:', err);
        return res.status(401).json({
          error: 'Authentication failed due to an error.',
          details: err.message,
        });
      }
      if (!user) {
        // Si pas d'utilisateur, cela signifie une authentification échouée.
        // `info` peut contenir des informations supplémentaires fournies par la stratégie.
        console.log('Authentication failed:', info);
        return res.redirect(process.env.URL);
      }
      // Si l'authentification est réussie, ajoutez l'utilisateur à l'objet req.
      req.logIn(user, loginErr => {
        if (loginErr) {
          console.error('Login error:', loginErr);
          return res
            .status(401)
            .json({error: 'Login failed.', details: loginErr.message});
        }
        // Continue vers le prochain middleware si l'authentification et le login sont réussis.
        next();
      });
    })(req, res, next);
  },

  // Middleware pour gérer la réponse après une authentification réussie.
  (req, res) => {
    console.log('Authentication successful, user:', req.user);
    res.json({
      id: req.user.id,
      email: req.user.emails[0].value,
      firstName: req.user.name.givenName,
      lastName: req.user.name.familyName,
    });
  },
];

// export const linkedinCallback = [
//   // Custom middleware pour capturer les tentatives d'authentification.
//   (req, res, next) => {
//     passport.authenticate('linkedin-oidc', (err, user, info) => {
//       if (err) {
//         // Log l'erreur et redirige ou répond avec un message d'erreur.
//         console.error('Authentication error:', err);
//         return res
//           .status(401)
//           .json({
//             error: 'Authentication failed due to an error.',
//             details: err.message,
//           });
//       }
//       if (!user) {
//         // Si pas d'utilisateur, cela signifie une authentification échouée.
//         // `info` peut contenir des informations supplémentaires fournies par la stratégie.
//         console.log('Authentication failed:', info);
//         return res.redirect(process.env.URL);
//       }
//       // Si l'authentification est réussie, ajoutez l'utilisateur à l'objet req.
//       req.logIn(user, loginErr => {
//         if (loginErr) {
//           console.error('Login error:', loginErr);
//           return res
//             .status(401)
//             .json({error: 'Login failed.', details: loginErr.message});
//         }
//         // Continue vers le prochain middleware si l'authentification et le login sont réussis.
//         next();
//       });
//     })(req, res, next);
//   },

//   // Middleware pour gérer la réponse après une authentification réussie.
//   (req, res) => {
//     console.log('Authentication successful, user:', req.user);
//     res.json({
//       id: req.user.id,
//       email: req.user.emails ? req.user.emails[0].value : 'No email',
//       firstName: req.user.name ? req.user.name.givenName : 'No first name',
//       lastName: req.user.name ? req.user.name.familyName : 'No last name',
//     });
//   },
// ];
