import React from "react";
import { deleteQuestion } from "../services/api";

function QuestionList({ questions, refreshQuestions }) {
  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>ID</th>
          <th>Question</th>
          <th>Difficulty</th>
          <th>Marks</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {questions.map((q) => (
          <tr key={q.id}>
            <td>{q.id}</td>
            <td>{q.questionText}</td>   {/* ✅ Updated */}
            <td>{q.difficulty}</td>
            <td>{q.marks}</td>
            <td>
              <button
                onClick={() => {
                  deleteQuestion(q.id).then(refreshQuestions);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default QuestionList;
