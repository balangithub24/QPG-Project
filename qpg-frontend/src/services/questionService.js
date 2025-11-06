import axios from "axios";
import api from "./api";
const API_BASE_URL = "http://localhost:8081/api/questions";


export const loginUser = ({ username, password }) => {
  return api.post("/auth/login", { username, password });
};

export const getAllQuestions = (token) =>
  axios.get(API_BASE_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const addQuestion = (question, token) =>
  axios.post(API_BASE_URL, question, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const deleteQuestion = (id, token) =>
  axios.delete(`${API_BASE_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
