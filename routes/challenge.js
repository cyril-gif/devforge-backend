import express from 'express';
import Challenge from '../models/Challenge.js';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Helper: pick 5 random quiz questions from a course
async function getRandomQuestions(courseId) {
  const lessons = await Lesson.find({ courseId }).select('quiz');
  const allQuestions = lessons.flatMap(l => l.quiz || []);
  // shuffle and take first 5
  for (let i = allQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
  }
  return allQuestions.slice(0, 5);
}

// Create a challenge
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { opponentId, courseId } = req.body;
    const challengerId = req.user._id;
    if (challengerId.toString() === opponentId) {
      return res.status(400).json({ message: 'Cannot challenge yourself' });
    }
    const opponent = await User.findById(opponentId);
    if (!opponent) return res.status(404).json({ message: 'Opponent not found' });

    const questions = await getRandomQuestions(courseId);
    if (questions.length === 0) {
      return res.status(400).json({ message: 'No questions available for this course' });
    }

    const challenge = new Challenge({
      challengerId,
      opponentId,
      courseId,
      questions,
    });
    await challenge.save();
    res.status(201).json(challenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept challenge
router.post('/:id/accept', authMiddleware, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
    if (challenge.opponentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not your challenge' });
    }
    challenge.status = 'accepted';
    await challenge.save();
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit answers
router.post('/:id/submit', authMiddleware, async (req, res) => {
  try {
    const { answers } = req.body; // array of 0-indexed choices
    const challenge = await Challenge.findById(req.params.id);
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
    if (challenge.status !== 'accepted') {
      return res.status(400).json({ message: 'Challenge not ready for answers' });
    }

    const userId = req.user._id;
    if (userId.toString() === challenge.challengerId.toString()) {
      challenge.challengerAnswers = answers;
    } else if (userId.toString() === challenge.opponentId.toString()) {
      challenge.opponentAnswers = answers;
    } else {
      return res.status(403).json({ message: 'Not participant' });
    }

    // If both have answered, determine winner
    if (challenge.challengerAnswers.length === 5 && challenge.opponentAnswers.length === 5) {
      let challengerScore = 0, opponentScore = 0;
      for (let i = 0; i < 5; i++) {
        if (challenge.challengerAnswers[i] === challenge.questions[i].correct) challengerScore++;
        if (challenge.opponentAnswers[i] === challenge.questions[i].correct) opponentScore++;
      }
      const winnerId = challengerScore > opponentScore ? challenge.challengerId :
                       opponentScore > challengerScore ? challenge.opponentId : null;
      challenge.winnerId = winnerId;
      challenge.status = 'completed';
      challenge.completedAt = new Date();
      
      // Award XP to winner (e.g., 50 XP)
      if (winnerId) {
        const winner = await User.findById(winnerId);
        winner.xp += 50;
        await winner.save();
        challenge.xpAwarded = 50;
      }
      await challenge.save();
    }
    await challenge.save();
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get pending challenges for current user
router.get('/pending', authMiddleware, async (req, res) => {
  try {
    const challenges = await Challenge.find({
      opponentId: req.user._id,
      status: 'pending',
    }).populate('challengerId', 'username');
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's completed challenges (history)
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const challenges = await Challenge.find({
      $or: [{ challengerId: req.user._id }, { opponentId: req.user._id }],
      status: 'completed',
    })
      .populate('challengerId opponentId', 'username')
      .sort({ completedAt: -1 })
      .limit(20);
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Weekly leaderboard (XP earned from challenges in last 7 days)
router.get('/weekly-leaderboard', async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const challenges = await Challenge.find({
      status: 'completed',
      completedAt: { $gte: oneWeekAgo },
      winnerId: { $ne: null },
    });
    const xpMap = new Map();
    for (const c of challenges) {
      const winnerId = c.winnerId.toString();
      xpMap.set(winnerId, (xpMap.get(winnerId) || 0) + c.xpAwarded);
    }
    const sorted = Array.from(xpMap.entries())
      .map(([userId, xp]) => ({ userId, xp }))
      .sort((a, b) => b.xp - a.xp)
      .slice(0, 10);
    // populate usernames
    const users = await User.find({ _id: { $in: sorted.map(s => s.userId) } }).select('username');
    const leaderboard = sorted.map(s => ({
      username: users.find(u => u._id.toString() === s.userId)?.username || 'Unknown',
      xp: s.xp,
    }));
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Get challenge by ID (for answering)
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('challengerId opponentId', 'username');
    if (!challenge) return res.status(404).json({ message: 'Challenge not found' });
    // Only participants can view
    if (challenge.challengerId._id.toString() !== req.user._id.toString() &&
        challenge.opponentId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    res.json(challenge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/my-created', authMiddleware, async (req, res) => {
  const challenges = await Challenge.find({
    challengerId: req.user._id,
    status: { $ne: 'completed' }
  }).populate('opponentId', 'username');
  res.json(challenges);
});

export default router;