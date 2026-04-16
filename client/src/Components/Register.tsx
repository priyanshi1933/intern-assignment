

import React, { useState, type ChangeEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userSchema } from "../Validation/userSchema";

interface IUser {
  email: string;
  password: string;
}

const Register = () => {
  const [msg, setMsg] = useState({ email: "", password: "" });
  const [user, setUser] = useState<IUser>({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setMsg((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = userSchema.safeParse(user);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setMsg({
        email: fieldErrors.email?.[0] || "",
        password: fieldErrors.password?.[0] || "",
      });
      return;
    }

    try {
      await axios.post("http://localhost:5000/register", result.data);
      alert("User Created Successfully");
      navigate("/");
    } catch (error: any) {
      setMsg((prev) => ({
        ...prev,
        email: error.response?.data?.message || "Registration failed",
      }));
    }
  };

  const styles = {
    wrapper: {
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f8f9fa",
    },
    card: {
      background: "white",
      padding: "2.5rem",
      borderRadius: "15px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      width: "100%",
      maxWidth: "450px",
    },
    errorText: {
      color: "#dc3545",
      fontSize: "0.85rem",
      textAlign: "left" as const,
      marginTop: "4px",
      minHeight: "20px",
    }
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 className="text-center mb-4" style={{ fontWeight: 700, color: "#333" }}>
          Create Account
        </h2>
        
        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={user.email}
            placeholder="name@example.com"
            onChange={handleChange}
            className={`form-control ${msg.email ? "is-invalid" : ""}`}
          />
          <div style={styles.errorText}>{msg.email}</div>
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter secure password"
            className={`form-control ${msg.password ? "is-invalid" : ""}`}
          />
          <div style={styles.errorText}>{msg.password}</div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 py-2"
          style={{ borderRadius: "8px", fontWeight: 600 }}
        >
          Register Now
        </button>
        
        <p className="text-center mt-3 text-muted">
          Already have an account? <span 
            onClick={() => navigate("/")} 
            style={{ cursor: 'pointer', color: '#667eea', fontWeight: 'bold' }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;

