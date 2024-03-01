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
