import express from 'express';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';
import authMiddleware from '../middleware/auth.js';
import { isAdmin } from '../middleware/admin.js';

const router = express.Router();

// Apply auth and admin middleware to all routes
router.use(authMiddleware, isAdmin);

// ========== USERS ==========
// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user role
router.put('/users/:userId/role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { role },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete user
router.delete('/users/:userId', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========== COURSES ==========
// Get all courses with lessons
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find({}).populate('lessons');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new course
router.post('/courses', async (req, res) => {
  try {
    const { title, description, icon, xpReward } = req.body;
    const course = new Course({ title, description, icon, xpReward });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a course
router.put('/courses/:courseId', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      req.body,
      { new: true }
    );
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a course (and its lessons)
router.delete('/courses/:courseId', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    await Lesson.deleteMany({ _id: { $in: course.lessons } });
    await course.deleteOne();
    res.json({ message: 'Course and lessons deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========== LESSONS ==========
// Add a lesson to a course
router.post('/courses/:courseId/lessons', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    const { title, content, videoUrl, quiz, xpValue } = req.body;
    const lesson = new Lesson({
      courseId: course._id,
      title,
      content,
      videoUrl,
      quiz: quiz || [],
      xpValue,
      order: course.lessons.length + 1,
    });
    await lesson.save();
    course.lessons.push(lesson._id);
    await course.save();
    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a lesson
router.put('/lessons/:lessonId', async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.lessonId,
      req.body,
      { new: true }
    );
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a lesson
router.delete('/lessons/:lessonId', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    await Course.updateOne(
      { lessons: lesson._id },
      { $pull: { lessons: lesson._id } }
    );
    await lesson.deleteOne();
    res.json({ message: 'Lesson deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ========== STATS ==========
router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalLessons = await Lesson.countDocuments();
    const totalCompleted = await User.aggregate([
      { $project: { completedCount: { $size: '$completedLessons' } } },
      { $group: { _id: null, total: { $sum: '$completedCount' } } },
    ]);
    const totalXP = await User.aggregate([
      { $group: { _id: null, totalXP: { $sum: '$xp' } } },
    ]);
    res.json({
      totalUsers,
      totalCourses,
      totalLessons,
      totalCompletedLessons: totalCompleted[0]?.total || 0,
      totalXP: totalXP[0]?.totalXP || 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;


