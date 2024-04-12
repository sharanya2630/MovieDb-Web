import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TopRated = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?api_key=78863c68ef90fc87b6f074f5c1b554d7&language=en-US&page=1"
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div className="movie-card" key={movie.id}>
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
          </Link>
          <div className="movie-details">
            <h1 className="movie-title ">
                {movie.title}
              </h1>
              <p className="movie-average-vote">Rating:
             {movie.vote_average}
              </p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default TopRated;
