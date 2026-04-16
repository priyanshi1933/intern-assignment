import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./style.css";
type Bookmark = {
  id: string;
  url: string;
  domain: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
};
const DispBookmark = () => {
  const [bookmark, setBookmark] = useState<Bookmark[]>();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const display = async () => {
    const res = await axios.get(
      `http://localhost:5000/getBookmark?search=${search}`,
    );
    setBookmark(res.data);
  };
  useEffect(() => {
    display();
  }, [search]);
  const handleDelete = async (id: any) => {
    await axios.delete(`http://localhost:5000/delBookmark/${id}`);
    setBookmark((prev) => prev?.filter((b) => (b.id || (b as any)._id) !== id));
    alert("Bookmark deleted successfully");
    navigate("/DispBookmark");
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 gap-3">
          <h1 className="fw-bold text-dark m-0">My Bookmarks</h1>

          <div className="d-flex gap-2 w-100 style-search-container">
            <input
              className="form-control shadow-sm custom-input"
              type="search"
              placeholder="Search your bookmarks..."
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {bookmark?.map((b) => (
            <div key={b.id || (b as any)._id} className="col">
              <div className="card h-100 border-0 shadow-sm bookmark-card overflow-hidden">
                <div className="position-relative">
                  <img
                    src={
                      b.image && b.image.startsWith("http")
                        ? b.image
                        : "https://placeholder.com"
                    }
                    alt={b.title}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  />

                  <span className="badge bg-dark bg-opacity-75  top-5 start-0 m-2">
                    {b.domain}
                  </span>
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold text-truncate mb-1">
                    {b.title || "Untitled"}
                  </h5>
                  <p className="card-text text-muted small mb-3 flex-grow-1">
                    {b.description.substring(0, 90)}...
                  </p>

            
                  <div className="mb-3">
                    <div className="d-flex flex-wrap gap-1">
                      {b.tags && b.tags.length > 0 ? (
                        b.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="badge bg-light text-secondary border"
                          >
                            #{tag}
                          </span>
                        ))
                      ) : (
                        <span className="badge bg-light text-secondary border">
                          #general
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="d-grid mt-auto pt-3 border-top">
                    <button
                      className="btn btn-outline-danger btn-sm fw-bold d-flex align-items-center justify-content-center gap-2"
                      onClick={() => handleDelete(b.id || (b as any)._id)}
                    >
                      <i className="bi bi-trash3"></i>
                      <span>Delete Bookmark</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DispBookmark;
