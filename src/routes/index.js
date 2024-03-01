import express from 'express';
import {
  authenticate,
  logout,
  googleCallback,
  githubCallback,
  facebookCallback,
} from '../controllers/authController.js';

const router = express.Router();

router.get('/google', authenticate('google'));
router.get('/github', authenticate('github'));
router.get('/facebook', authenticate('facebook'));

router.get('/callback/google', googleCallback);
router.get('/callback/github', githubCallback);
router.get('/callback/facebook', facebookCallback);

router.get('/logout', logout);

export {router as authRoutes};
