import { useState, useEffect } from "react";
import axios from "axios";
import "./AIInterview.css";

function AIInterview() {
  const [jobs, setJobs] = useState([]);
  const [role, setRole] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(null);

  // Fetch jobs
  useEffect(() => {
    axios
      .get("https://jobportal-1-x84n.onrender.com/api/jobs")
      .then((res) => setJobs(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Timer logic
  useEffect(() => {
    if (questions.length === 0 || score !== null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNext();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [questions, currentIndex, score]);

  const handleGenerate = async () => {
    if (!role) return alert("Please select a job role");

    setLoading(true);
    setScore(null);
    setCurrentIndex(0);
    setAnswers({});
    setTimeLeft(60);

    try {
      const res = await axios.post(
        "https://jobportal-1-x84n.onrender.com/api/ai/questions",
        { role }
      );

      const list = Array.isArray(res.data.questions)
        ? res.data.questions
        : res.data.questions.split(/\r?\n/).filter(q => q.trim() !== "");

      setQuestions(list);
    } catch (err) {
      alert("Failed to generate questions.");
    }

    setLoading(false);
  };

  const handleAnswerChange = (value) => {
    setAnswers({ ...answers, [currentIndex]: value });
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(60);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let totalScore = 0;

    questions.forEach((q, index) => {
      const answer = answers[index] || "";

      // Basic scoring logic
      if (answer.length > 20) totalScore += 5;
      if (answer.length > 50) totalScore += 5;

      // Simple keyword match
      const keywords = q.toLowerCase().split(" ");
      keywords.forEach(word => {
        if (answer.toLowerCase().includes(word)) {
          totalScore += 1;
        }
      });
    });

    setScore(totalScore);
  };

  return (
    <div className="ai-page">
      <div className="ai-card">
        <h2>AI Timer Mock Interview</h2>

        <div className="ai-form">
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">-- Select Job Role --</option>
            {jobs.map((job) => (
              <option key={job._id} value={job.title}>
                {job.title} @ {job.company}
              </option>
            ))}
          </select>

          <button onClick={handleGenerate} disabled={loading}>
            {loading ? "Generating..." : "Start Interview"}
          </button>
        </div>

        {questions.length > 0 && score === null && (
          <div className="interview-section">
            <div className="timer">⏳ Time Left: {timeLeft}s</div>

            <div className="question-block">
              <h4>
                Question {currentIndex + 1} of {questions.length}
              </h4>
              <p>{questions[currentIndex]}</p>

              <textarea
                placeholder="Type your answer..."
                value={answers[currentIndex] || ""}
                onChange={(e) =>
                  handleAnswerChange(e.target.value)
                }
              />
            </div>

            <button className="next-btn" onClick={handleNext}>
              {currentIndex + 1 === questions.length
                ? "Finish Interview"
                : "Next Question"}
            </button>
          </div>
        )}

        {score !== null && (
          <div className="result-section">
            <h3>Interview Completed 🎉</h3>
            <p>Your Score: {score}</p>
            <p>
              {score > 50
                ? "Excellent Performance!"
                : score > 30
                ? "Good Job! Keep Improving."
                : "Practice More and Try Again."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AIInterview;