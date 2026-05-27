import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// POST /api/ai/ask
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { message, context } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Optional: provide context about the user's current page/lesson
    const systemPrompt = `You are DevForge AI, a friendly coding tutor helping students learn web development. 
The user is learning full-stack development. Keep answers clear, concise (under 150 words), and beginner-friendly.
Use examples when helpful. If they ask for code, provide formatted code snippets.`;

    const fullPrompt = `${systemPrompt}\n\nUser context: ${context || 'No specific context'}\n\nUser question: ${message}`;
    
    // Call Gemini API
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const reply = response.text();
    
    res.json({ reply });
  } catch (error) {
    console.error('Gemini API error:', error);
    res.status(500).json({ error: 'AI service temporarily unavailable' });
  }
});

export default router;



