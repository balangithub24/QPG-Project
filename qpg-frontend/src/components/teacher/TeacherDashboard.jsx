import React from "react";
import { useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome Teacher 👨‍🏫</h1>

      <div style={styles.menu}>
        <button style={styles.btn} onClick={() => navigate("/add-question")}>
          ➕ Add Question
        </button>

        <button style={styles.btn} onClick={() => navigate("/user/home")}>
          📚 View All Questions
        </button>

        <button style={styles.btn} onClick={() => navigate("/teacher/upload-material")}>
          📄 Upload Study Materials
        </button>

        <button style={{ ...styles.btn, background: "#d9534f" }} onClick={logout}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
    fontFamily: "Arial",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "30px",
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  btn: {
    padding: "14px 28px",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
    background: "#5bc0de",
    color: "white",
    width: "260px",
  },
};

export default TeacherDashboard;
