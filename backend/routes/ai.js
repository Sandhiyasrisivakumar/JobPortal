import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Ensure .env is loaded
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

// Read API key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) throw new Error("OpenAI API Key not found in environment variables!");

// Initialize OpenAI
const openai = new OpenAI({ apiKey });

// POST /api/ai/questions
router.post("/questions", async (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ message: "Job role is required" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert technical interviewer." },
        { role: "user", content: `Generate 5–10 technical interview questions for the role: ${role}. Only questions, no answers. Make it professional and relevant.` }
      ],
      temperature: 0.7,
      max_tokens: 400
    });

    const questions = response.choices[0].message.content;
    res.json({ questions });
  } catch (err) {
    console.error("OpenAI error:", err);
    res.status(500).json({ message: "AI generation failed", error: err.message });
  }
});

export default router;