import React, { useState, type ChangeEvent } from "react";

import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { userSchema } from "../Validation/userSchema";
interface IUser {
  email: string;
  password: string;
}
const Register = () => {
  const [msg, setMsg] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useState<IUser>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
    setMsg((prev) => ({ ...prev, [name]: " " }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result=userSchema.safeParse(user);
    if(!result.success){
      const fieldErrors=result.error.flatten().fieldErrors;
      setMsg({
        email:fieldErrors.email?.[0] || "",
        password:fieldErrors.password?.[0] || "",
      })
      return;
    }
    setMsg({email:"",password:""});
    
    try {
      await axios.post("http://localhost:5000/register", result.data);
      alert("User Created Successfully");
      navigate("/login");
    } catch (error: any) {
      if (error.response && error.response.data) {
        setMsg((prev) => ({ ...prev, email: error.response.data.message }));
      } else {
        alert("Something went wrong. Please try again after some time");
      }
    }
  };
  return (
    <>
      <form method="post" className="add" onSubmit={handleSubmit}>
        <center>
          <h1 className="mt-5">Registration</h1>
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
              Register
            </button>
            
          </div>
        </center>
      </form>
    </>
  );
};

export default Register;
