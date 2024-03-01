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

// export function handleCallbackGoogle(req, res) {
//   if (req.user) {
//     res.json({
//       id: req.user.id,
//       email: req.user.emails[0].value,
//       firsName: req.user.name.givenName,
//       lastName: req.user.name.familyName,
//     });
//   } else {
//     res.redirect('http://localhost:3000');
//   }
// }

// export function handleCallbackGithub(req, res) {
//   if (req.user) {
//     res.json({
//       id: req.user.id,
//       email: req.user.email,
//       firsName: req.user.name,
//     });
//   } else {
//     res.redirect('http://localhost:3000');
//   }
// }

// export function handleCallbackFacebook(req, res) {
//   if (req.user) {
//     res.json({
//       id: req.user.id,
//       email: req.user.emails[0].value,
//       firstName: req.user.name.givenName,
//       lastName: req.user.name.familyName,
//     });
//   } else {
//     res.redirect('http://localhost:3000');
//   }
// }
