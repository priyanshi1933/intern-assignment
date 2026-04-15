import React, { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
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
      <center>
        <div className="container mt-5">
          <form method="post" className="add" onSubmit={handleSubmit}>
            <center>
              <h1 className="mt-5">Add Bookmark</h1>
              <div className="container mt-5">
                <input
                  type="text"
                  id="url"
                  name="url"
                  value={data.url}
                  placeholder="Enter Your URL"
                  onChange={handleChange}
                  className="form-control mt-3"
                  style={{ width: "500px" }}
                />

               

                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  style={{ width: "500px" }}
                >
                  Add BookMark
                </button>
              </div>
            </center>
          </form>
        </div>
      </center>
    </>
  );
};

export default Dashboard;
