import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Popular() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=78863c68ef90fc87b6f074f5c1b554d7&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => {
        const moviesData = data.results;
        setMovies(moviesData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
               
              />
            </Link>
            <div className="movie-details">
              <h1 style={{ color: "yellow", fontSize: "16px" }}>
                {movie.title}
              </h1>
              <p style={{ color: "white", fontSize: "16px" }}>
                Rating: {movie.vote_average}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Popular;
