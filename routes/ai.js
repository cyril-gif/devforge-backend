import express from 'express';
import Groq from 'groq-sdk';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const systemPrompt = `You are DevForge AI, a friendly coding tutor. Keep answers short (under 150 words), provide code examples in markdown, and be helpful.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      model: 'llama3-8b-8192', // free model
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = chatCompletion.choices[0]?.message?.content || 'No response';
    res.json({ reply });
  } catch (error) {
    console.error('Groq API error:', error);
    res.status(500).json({ error: 'AI service temporarily unavailable' });
  }
});

export default router;

