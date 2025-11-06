import React from "react";
import { Link } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {
  return (
    <div className="student-dashboard">
      
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">🎓 Student</h2>
        <ul>
          <li><Link to="/student/dashboard">🏠 Dashboard</Link></li>
          <li><Link to="/student/profile">👤 Profile</Link></li>
          <li><Link to="/student/exams">📝 Exams</Link></li>
          <li><Link to="/student/results">📊 Results</Link></li>
          <li><Link to="/student/notes">📚 Notes</Link></li>
          <li><Link to="/">🚪 Logout</Link></li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        <h1>Welcome Student 👋</h1>
        <p>You are logged in successfully.</p>

        <div className="cards">

          {/* Card 1 → Study Materials */}
          <Link to="/student/materials" className="card">
            📚 Study Materials
          </Link>

          {/* Card 2 → Upcoming Exams */}
          <Link to="/student/upcoming-exams" className="card">
            📝 Upcoming Exams
          </Link>

          {/* Card 3 → View Results */}
          <Link to="/student/results" className="card">
            📊 View Results
          </Link>

        </div>
      </main>
    </div>
  );
}

export default StudentDashboard;
