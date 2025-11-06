import axios from "axios";

// ✅ Create axios instance
const API = axios.create({
  baseURL: "http://localhost:8081",
});

// ✅ Interceptor: Attach JWT token to every request automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor: Handle expired tokens or 403 errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      console.warn("⚠️  Access Denied or Token Expired — logging out...");
      localStorage.clear();
      window.location.href = "/"; // redirect to login
    }
    return Promise.reject(error);
  }
);

// =======================
// 🔐 AUTH APIs
// =======================
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// =======================
// 🧠 QUESTION APIs
// =======================
export const getQuestions = () => API.get("/api/questions");
export const addQuestion = (question) =>
  API.post("/api/questions", question, {
    headers: {
      "Content-Type": "application/json", // ✅ ensure JSON body
    },
  });
export const deleteQuestion = (id) => API.delete(`/api/questions/${id}`);

// =======================
// 📄 STUDY MATERIAL APIs
// =======================
export const uploadMaterial = (formData) =>
  API.post("/api/materials/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getMaterials = () => API.get("/api/materials");

export default API;
