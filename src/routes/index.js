import express from 'express';
import {
  authenticate,
  logout,
  googleCallback,
  githubCallback,
  linkedinCallback,
  azureadCallback,
} from '../controllers/authController.js';

const router = express.Router();

router.get('/google', authenticate('google'));
router.get('/github', authenticate('github'));
router.get('/linkedin', authenticate('linkedin-oidc'));
router.get('/microsoft', authenticate('azuread'));


router.get('/callback/google', googleCallback);
router.get('/callback/github', githubCallback);
router.get('/callback/linkedin', linkedinCallback);
router.get('/callback/microsoft', azureadCallback);

router.get('/logout', logout);

export {router as authRoutes};
