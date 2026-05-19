import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true }, // HTML/Markdown detailed content
  videoUrl: { type: String, default: '' },   // YouTube embed URL
  quiz: [{
    question: String,
    options: [String],
    correct: Number
  }],
  xpValue: { type: Number, default: 50 },
  order: { type: Number, default: 0 }
});

export default mongoose.model('Lesson', lessonSchema);