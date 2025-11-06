import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

// Dashboards
import AdminDashboard from "./components/AdminDashboard";
import TeacherDashboard from "./components/teacher/TeacherDashboard";
import StudentDashboard from "./components/student/StudentDashboard";

import QuestionDashboard from "./components/QuestionDashboard";
import AddQuestion from "./components/AddQuestion";

import StudyMaterials from "./components/student/StudyMaterials";
import UpcomingExams from "./components/student/UpcomingExams";
import ViewResults from "./components/student/ViewResults";

// Teacher components
import UploadMaterial from "./components/teacher/UploadMaterial";

import ProtectedRoute from "./auth/ProtectedRoute"; // ✅ Protects routes based on roles

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} /> {/* ✅ Added this line */}
        <Route path="/register" element={<Register />} />

        {/* 🏠 Common Route */}
        <Route path="/user/home" element={<QuestionDashboard />} />

        {/* 👨‍💼 Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 👨‍🏫 Teacher Routes */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/upload-material"
          element={
            <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
              <UploadMaterial />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-question"
          element={
            <ProtectedRoute allowedRoles={["TEACHER", "ADMIN"]}>
              <AddQuestion />
            </ProtectedRoute>
          }
        />

        {/* 🎓 Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/materials"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudyMaterials />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/exams"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <UpcomingExams />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/results"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <ViewResults />
            </ProtectedRoute>
          }
        />

        {/* ⚠️ Catch-all Route for 404 Pages */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <h2>404 - Page Not Found</h2>
              <p>The page you are looking for doesn’t exist.</p>
              <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
                Go back to Login
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
