import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "./Header.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HeaderCard() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (type) => {
    navigate(`/search?type=${type}&q=${searchQuery}`);
  };
  return (
    <div>
      <div className="header-card">
        <div className="movie-heading">
          <Link to="/">
            <h1 className="movie">
              MOVIE <span style={{ color: "#0effdf" }}>DB</span>
            </h1>
          </Link>
        </div>
        <div className="header-inner-card">
          <Link to="/">
            <h1 className="movie"> Popular</h1>
          </Link>
          <Link to="/toprated">
            <h1 className="movie">Top Rated</h1>
          </Link>
          <Link to="/upcoming">
            <h1 className="movie"> Up Coming</h1>
          </Link>
          <div>
            <TextField
              size="small"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a movie..."
              style={{
                background: "white",
                borderRadius: "6px",
                width: "250px",
                marginTop: "4px",
              }}
              variant="outlined"
            />
            <button onClick={() => handleSearch("popular")} className="search">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderCard;
