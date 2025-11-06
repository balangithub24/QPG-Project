import React from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome Admin 👋</h1>

      <div style={styles.menu}>
        <button style={styles.btn} onClick={() => navigate("/add-question")}>
          ➕ Add Question
        </button>

        <button style={styles.btn} onClick={() => navigate("/user/home")}>
          📚 View All Questions
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
    justifyContent: "center",
    gap: "20px",
  },
  btn: {
    padding: "12px 24px",
    fontSize: "18px",
    cursor: "pointer",
    border: "none",
    borderRadius: "8px",
    background: "#0275d8",
    color: "white",
  },
};

export default AdminDashboard;
