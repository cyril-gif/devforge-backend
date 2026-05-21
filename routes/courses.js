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

// GET /api/courses/:courseId
router.get('/:courseId', authMiddleware, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId).populate('lessons');
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const user = req.user; // already attached by authMiddleware
    const completedLessonIds = user.completedLessons.map(id => id.toString());

    // Augment each lesson with an `isLocked` flag
    const lessonsWithLock = course.lessons.map((lesson, index) => {
      // First lesson is always unlocked (if no previous lessons)
      let isLocked = false;
      if (index > 0) {
        const previousLessonId = course.lessons[index - 1]._id.toString();
        const previousCompleted = completedLessonIds.includes(previousLessonId);
        isLocked = !previousCompleted;
      }
      return {
        ...lesson.toObject(),
        isLocked,
        completed: completedLessonIds.includes(lesson._id.toString())
      };
    });

    res.json({ ...course.toObject(), lessons: lessonsWithLock });
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