import express from 'express';
import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('lessons');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single course with lessons
router.get('/:courseId', async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate('lessons');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Enroll in course
router.post('/:courseId/enroll', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    if (!user.enrolledCourses.includes(req.params.courseId)) {
      user.enrolledCourses.push(req.params.courseId);
      await user.save();
    }
    res.json({ message: 'Enrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;