import React, { useEffect, useState } from "react";
import { getQuestions } from "../services/api";
import QuestionList from "./QuestionList";
import AddQuestion from "./AddQuestion";

function QuestionDashboard() {
  const [questions, setQuestions] = useState([]);

  const loadQuestions = () => {
    getQuestions().then((res) => setQuestions(res.data));
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  return (
    <div>
      <h1>Question Dashboard</h1>
      <AddQuestion refreshQuestions={loadQuestions} />
      <QuestionList questions={questions} refreshQuestions={loadQuestions} />
    </div>
  );
}

export default QuestionDashboard;
