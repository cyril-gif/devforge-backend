import express from 'express';
import Lesson from '../models/Lesson.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Complete lesson and award XP
router.post('/complete-lesson', authMiddleware, async (req, res) => {
  try {
    const { lessonId, quizAnswers } = req.body;
    const user = req.user;
    
    // Check if already completed
    if (user.completedLessons.includes(lessonId)) {
      return res.json({ message: 'Lesson already completed' });
    }
    
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    
    // Grade quiz if exists
    let score = 100;
    if (lesson.quiz && lesson.quiz.length > 0 && quizAnswers) {
      let correct = 0;
      lesson.quiz.forEach((q, idx) => {
        if (quizAnswers[idx] === q.correct) correct++;
      });
      score = (correct / lesson.quiz.length) * 100;
    }
    
    if (score >= 70) { // Pass if 70% or higher
      user.completedLessons.push(lessonId);
      user.xp += lesson.xpValue;
      
      // Update streak
      const today = new Date().toDateString();
      const lastActive = user.lastActive.toDateString();
      if (lastActive === today) {
        // Already active today
      } else if (new Date(user.lastActive).getDate() === new Date().getDate() - 1) {
        user.streak += 1;
      } else {
        user.streak = 1;
      }
      user.lastActive = new Date();
      
      await user.save();
      res.json({ success: true, xpGained: lesson.xpValue, newTotalXp: user.xp, streak: user.streak });
    } else {
      res.json({ success: false, message: 'Quiz score too low. Try again!', score });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user progress
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    const completedLessonIds = user.completedLessons.map(id => id.toString());
    res.json({
      xp: user.xp,
      streak: user.streak,
      badges: user.badges,
      completedLessons: completedLessonIds,
      enrolledCourses: user.enrolledCourses
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;