import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  challengerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  opponentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  questions: [
    {
      question: String,
      options: [String],
      correct: Number,
    },
  ],
  challengerAnswers: [Number],
  opponentAnswers: [Number],
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'rejected'],
    default: 'pending',
  },
  winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  xpAwarded: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
});

export default mongoose.model('Challenge', challengeSchema);