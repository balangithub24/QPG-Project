import React, { useState } from "react";
import { addQuestion } from "../services/api";

function QuestionForm({ refreshQuestions }) {
  const [formData, setFormData] = useState({
    question_text: "",
    difficulty: "",
    marks: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addQuestion(formData).then(() => {
      refreshQuestions();
      setFormData({ question_text: "", difficulty: "", marks: "" });
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="question_text"
        placeholder="Question"
        value={formData.question_text}
        onChange={handleChange}
      />
      <input
        type="text"
        name="difficulty"
        placeholder="Difficulty (easy/medium/hard)"
        value={formData.difficulty}
        onChange={handleChange}
      />
      <input
        type="number"
        name="marks"
        placeholder="Marks"
        value={formData.marks}
        onChange={handleChange}
      />
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
