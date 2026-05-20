import express from 'express';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';
import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';

const router = express.Router();

// GET /api/profile/:userId? (if no userId, get current user)
router.get('/:userId?', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId || req.user._id;
    const user = await User.findById(userId)
      .select('-password')
      .populate('enrolledCourses', 'title icon')
      .populate('badges');
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Calculate course progress (completed lessons per course)
    const courses = await Course.find().populate('lessons');
    const progress = {};
    for (const course of courses) {
      const completedCount = course.lessons.filter(l => user.completedLessons.includes(l._id)).length;
      progress[course._id] = {
        title: course.title,
        completed: completedCount,
        total: course.lessons.length,
        percent: course.lessons.length ? (completedCount / course.lessons.length) * 100 : 0
      };
    }

    // Certificates: courses where all lessons are completed
    const certificates = [];
    for (const course of courses) {
      const allCompleted = course.lessons.every(l => user.completedLessons.includes(l._id));
      if (allCompleted && course.lessons.length) {
        certificates.push(course.title);
      }
    }

    res.json({
      user,
      courseProgress: progress,
      certificates,
      stats: {
        xp: user.xp,
        streak: user.streak,
        longestStreak: user.longestStreak || user.streak,
        level: Math.floor(user.xp / 500) + 1,
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/profile – update current user's profile
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { bio, location, website, avatar } = req.body;
    const updates = {};
    if (bio !== undefined) updates.bio = bio;
    if (location !== undefined) updates.location = location;
    if (website !== undefined) updates.website = website;
    if (avatar !== undefined) updates.avatar = avatar;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;