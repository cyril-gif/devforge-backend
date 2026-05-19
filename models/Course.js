import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  icon: String,
  color: String,
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  xpReward: { type: Number, default: 100 }
});

export default mongoose.model('Course', courseSchema);