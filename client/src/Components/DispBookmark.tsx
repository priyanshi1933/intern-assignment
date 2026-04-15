import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../Utils/auth";
type Bookmark = {
  id: string;
  url: string;
  domain: string;
  title: string;
  description: string;
  tags: string;
};
const DispBookmark = () => {
    const logOut = () => {
    logout();
    navigate("/login");
  };
  const [bookmark, setBookmark] = useState<Bookmark[]>();
  const [search, setSearch] = useState("");
  const navigate=useNavigate();
  const display = async () => {
    const res = await axios.get(`http://localhost:5000/getBookmark?search=${search}`);
    setBookmark(res.data);
  };
  useEffect(() => {
    display();
  }, [search]);
  const handleDelete=async(id:any)=>{
    await axios.delete(`http://localhost:5000/delBookmark/${id}`)
    setBookmark((prev) =>
        prev?.filter((b) => (b.id || (b as any)._id) !== id),
      );
    alert("Bookmark deleted successfully");
    navigate('/DispBookmark')
  }
  return (
    <div className="container">
      <center>
        <h1 className="mt-5">Display Bookmark</h1>
        <form className="d-flex justify-content-between w-100" role="search">
          <input
            className="form-control me-2"
            style={{ width: "400px" }}
            type="search"
            placeholder="Search Bookmark..."
            aria-label="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          </form>
        {bookmark?.map((b) => (
          <div
            key={b.id || (b as any)._id}
            className="card mt-5"
            style={{ width: "28rem" }}
          >
            <div className="card-body">
              <p className="card-title">URL: {b.url}</p>
              <p className="card-subtitle">
               Domain: {b.domain}
              </p>
              <p className="card-text">
                Title: {b.title}
              </p>
               <p className="card-text">
                Description: {b.description}
              </p>
               <p className="card-text">
                Tags: {b.tags}
              </p>
             <button className="btn btn-danger" onClick={() => handleDelete(b.id || (b as any)._id)}>Delete</button>
            </div>
          </div>
        ))}
      </center>
       <center><button
        type="submit"
        className="btn btn-primary mt-3 ms-3"
        style={{ width: "100px" }}
        onClick={logOut}
      >
        Logout
      </button>
      </center>
    </div>
  );
};

export default DispBookmark;
