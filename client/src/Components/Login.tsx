
import React, { useState, type ChangeEvent } from "react";

import {  Link, useNavigate } from "react-router-dom";
import { loginUser } from "../Api/auth";
import { saveToken } from "../Utils/auth";

interface IUser {
  email: string;
  password: string;
}
const Login = () => {
  const [msg, setMsg] = useState({
    email: "",
    password: "",
  });
  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(() => ({ ...user, [name]: value }));
    setMsg((prev) => ({ ...prev, [name]: " " }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let validationErrors = { email: "", password: "" };
    let hasError = false;
    if (user.email == "") {
      validationErrors.email = "Please enter email";
      hasError = true;
    }
    if (user.password == "") {
      validationErrors.password = "Please enter password";
      hasError = true;
    } else if (user.password.length < 6) {
      validationErrors.password = "Password must be atleast 6 characters long";
      hasError = true;
    }
    setMsg(validationErrors);
    if (hasError) return;
    try {
      // await axios.post("http://localhost:3000/login", user);
      const res=await loginUser(user.email,user.password);
      saveToken(res.data.token);
      alert("Login Successfully");
      navigate("/DispBookmark");
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { field, message } = error.response.data;
        setMsg((prev) => ({ ...prev, [field]: message }));
      } else {
        alert("Network error. Please check your connection.");
      }
    }
  };
  return (
    <>
      <form method="post" className="add" onSubmit={handleSubmit}>
        <center>
          <h1 className="mt-5">Login</h1>
          <div className="container mt-5">
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              placeholder="Enter Your Email"
              onChange={handleChange}
              className="form-control mt-3"
              style={{ width: "500px" }}
            />
            <div style={{ color: "red" }}>{msg.email}</div>
            <input
              type="password"
              id="password"
              value={user.password}
              name="password"
              onChange={handleChange}
              placeholder="Enter Your Password"
              className="form-control mt-3"
              style={{ width: "500px" }}
            />
            <div style={{ color: "red" }}>{msg.password}</div>
            <button
              type="submit"
              className="btn btn-primary mt-3"
              style={{ width: "500px" }}
            >
              Login
            </button>
            <h6 className="mt-3">Or SignUp</h6>
            <Link to='/register'>SignUp</Link>
          </div>
          
        </center>
      </form>
    </>
  );
};

export default Login;
