import React, { useState } from "react";
import "./AddQuestion.css";

function AddQuestion() {
  const [questionText, setQuestionText] = useState("");
  const [marks, setMarks] = useState(1);
  const [difficulty, setDifficulty] = useState("Easy");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionData = {
      questionText,
      marks,
      difficulty,
    };

    try {
      const response = await fetch("http://localhost:8081/api/questions/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questionData),
      });

      if (response.ok) {
        alert("✅ Question added successfully!");
        setQuestionText("");
        setMarks(1);
        setDifficulty("Easy");
      } else {
        alert("❌ Something went wrong while adding the question.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="add-question-container">
      <div className="add-question-card">
        <h2 className="add-question-title">Add Theory Question</h2>

        <form onSubmit={handleSubmit} className="add-question-form">
          <div className="form-group">
            <label>Question Text:</label>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Enter your question..."
              required
            ></textarea>
          </div>

          <div className="form-group-inline">
            <div>
              <label>Marks:</label>
              <input
                type="number"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                min="1"
                required
              />
            </div>

            <div>
              <label>Difficulty:</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn">
            ➕ Add Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddQuestion;
