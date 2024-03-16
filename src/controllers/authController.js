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

