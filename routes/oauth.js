import express from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/api/oauth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails[0].value });
    if (!user) {
      user = new User({
        username: profile.displayName.replace(/\s/g, '').toLowerCase(),
        email: profile.emails[0].value,
        avatar: profile.photos?.[0]?.value || '',
        emailVerified: true,
        provider: 'google',
        password: ''
      });
      await user.save();
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return done(null, { user, token });
  } catch (err) {
    return done(err, null);
  }
}));

// GitHub Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: `${process.env.BACKEND_URL}/api/oauth/github/callback`
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        username: profile.username,
        email: email,
        avatar: profile.photos?.[0]?.value || '',
        emailVerified: true,
        provider: 'github',
        password: ''
      });
      await user.save();
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return done(null, { user, token });
  } catch (err) {
    return done(err, null);
  }
}));

// Initiate OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// Callbacks
router.get('/google/callback', 
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed` }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(`${process.env.FRONTEND_URL}/oauth-redirect?token=${token}`);
  }
);

router.get('/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/login?error=oauth_failed` }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(`${process.env.FRONTEND_URL}/oauth-redirect?token=${token}`);
  }
);

export default router;