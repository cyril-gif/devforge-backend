import express from 'express';
import Lesson from '../models/Lesson.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get single lesson by ID
router.get('/:lessonId', authMiddleware, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }
    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;