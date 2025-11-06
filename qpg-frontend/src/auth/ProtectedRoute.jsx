import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRoles }) {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // No logged-in user → redirect to login
  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  const userRole = storedUser.role?.toUpperCase(); // 👈 ensures consistent casing

  // Role not allowed → deny access
  if (!allowedRoles.includes(userRole)) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Access Denied 🚫</h2>
        <p>You are not authorized to view this page.</p>
        <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
          Go back to Login
        </a>
      </div>
    );
  }

  // ✅ If allowed, render page
  return children;
}

export default ProtectedRoute;
