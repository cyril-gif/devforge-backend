import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// GET /api/leaderboard?sort=xp (default) or streak
router.get('/', async (req, res) => {
  try {
    const sortBy = req.query.sort === 'streak' ? 'streak' : 'xp';
    const users = await User.find({})
      .select('username xp streak badges')
      .sort({ [sortBy]: -1 })
      .limit(50);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;