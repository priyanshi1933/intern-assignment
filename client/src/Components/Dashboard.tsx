import React, { useState, type ChangeEvent } from "react";
import './style.css'
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
interface IBookmark {
  userId: string;
  url: string;
 
}

const Dashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<IBookmark>({
    userId: "",
    url: "",
  });



  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    

    const res = await axios.post(
      `http://localhost:5000/addBookmark`,
      data, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Success:", res.data);
    alert("Bookmark Created Successfully");
    navigate("/DispBookmark");
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
};

  

  return (
    <>
    <Navbar/>
  <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div className="card shadow-lg border-0 p-5" style={{ maxWidth: "600px", width: "100%", borderRadius: "20px" }}>
      <form method="post" className="add" onSubmit={handleSubmit}>
        <div className="text-center mb-4">
        
          <h1 className="fw-bold text-dark">URL Metadata Fetcher</h1>
          <p className="text-muted">Enter a link below to extract titles, images, and descriptions.</p>
        </div>

        <div className="form-group">
          <label htmlFor="url" className="form-label fw-semibold ps-1">Website URL</label>
          <input
            type="text"
            id="url"
            name="url"
            value={data.url}
            placeholder="https://example.com"
            onChange={handleChange}
            className="form-control form-control-lg custom-input"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-lg w-100 mt-4 py-3 fw-bold shadow-sm fetch-btn"
        >
          Fetch Metadata
        </button>
      </form>
    </div>
  </div>
  </>
);

};

export default Dashboard;
