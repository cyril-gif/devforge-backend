import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const users = await User.find({}).select('username _id');
  res.json(users);
});

export default router;