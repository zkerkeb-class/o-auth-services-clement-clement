import express from 'express';
import {
  authenticate,
  logout,
  // handleCallbackGithub,
  // handleCallbackGoogle,
  // handleCallbackFacebook,
} from '../controllers/authController.js';

const router = express.Router();

router.get('/google', authenticate('google'));
router.get('/github', authenticate('github'));
router.get('/facebook', authenticate('facebook'));

router.get('/logout', logout);

// router.get('/callback/google', authenticate('google'), handleCallbackGoogle);
// router.get('/callback/github', authenticate('github'), handleCallbackGithub);
// router.get(
//   '/callback/facebook',
//   authenticate('facebook'),
//   handleCallbackFacebook,
// );

export {router as authRoutes};
