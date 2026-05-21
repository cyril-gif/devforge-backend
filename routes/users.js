import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const users = await User.find({}).select('username _id');
  res.json(users);
});

// GET /api/users/random – returns a random user (not yourself)
router.get('/random', authMiddleware, async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const count = await User.countDocuments({ _id: { $ne: currentUserId } });
    const random = Math.floor(Math.random() * count);
    const randomUser = await User.findOne({ _id: { $ne: currentUserId } }).skip(random).select('username _id avatar');
    res.json(randomUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/users/search?q=keyword – search users by username
router.get('/search', authMiddleware, async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.length < 2) return res.json([]);
    const users = await User.find({
      _id: { $ne: req.user._id },
      username: { $regex: q, $options: 'i' }
    }).limit(10).select('username _id avatar');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;