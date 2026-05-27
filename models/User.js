import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  emailVerified: { type: Boolean, default: false },
verificationToken: { type: String, default: null },
verificationTokenExpires: { type: Date, default: null },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false, default: '' },
  resetPasswordToken: { type: String, default: null },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
resetPasswordExpires: { type: Date, default: null },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
  provider: { type: String, enum: ['email', 'google', 'github'], default: 'email' },
  badges: [{ type: String }],
  bio: { type: String, default: '' },
location: { type: String, default: '' },
website: { type: String, default: '' },
avatar: { type: String, default: '' },
longestStreak: { type: Number, default: 0 },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);