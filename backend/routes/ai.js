import express from "express";

const router = express.Router();

// POST /api/ai/questions
router.post("/questions", async (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ message: "Job role is required" });
  }

  try {
    // Mock AI Question Generator
    const questions = `
1. What are the core responsibilities of a ${role}?
2. What technologies are commonly used in ${role}?
3. Explain a challenging project you handled as a ${role}.
4. How do you debug issues in ${role} development?
5. What best practices do you follow as a ${role}?
6. How do you optimize performance in ${role} related tasks?
7. Explain REST APIs and their role in ${role}.
8. What is version control and why is it important?
9. Describe problem-solving strategies in ${role}.
10. How do you stay updated with industry trends?
    `;

    res.json({ questions });

  } catch (err) {
    console.error("Error generating questions:", err);
    res.status(500).json({ message: "Failed to generate questions" });
  }
});

export default router;