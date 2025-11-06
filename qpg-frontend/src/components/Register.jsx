import React, { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Register API will be connected soon");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center">Register</h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="form-control my-2"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="form-control my-2"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
        </select>

        <button className="btn btn-success w-100 mt-3">Register</button>
      </form>
    </div>
  );
}
