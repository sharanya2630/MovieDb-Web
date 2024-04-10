
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./SearchPage.css"; 

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q");
    if (query) {
      setSearchQuery(query);
      fetchSearchResults(query);
    }
  }, [location.search]);

  const fetchSearchResults = async (query) => {
    try {
      const searchResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=78863c68ef90fc87b6f074f5c1b554d7&language=en-US&query=${query}&page=1`
      );
      const searchData = await searchResponse.json();

      if (searchData.results.length > 0) {
        const popularResponse = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=78863c68ef90fc87b6f074f5c1b554d7&language=en-US&page=1`
        );
        const popularData = await popularResponse.json();

        const topRatedResponse = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=78863c68ef90fc87b6f074f5c1b554d7&language=en-US&page=1`
        );
        const topRatedData = await topRatedResponse.json();

        const upcomingResponse = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=78863c68ef90fc87b6f074f5c1b554d7&language=en-US&page=1`
        );
        const upcomingData = await upcomingResponse.json();

        const searchedMovie = searchData.results.find((movie) =>
          [
            popularData.results,
            topRatedData.results,
            upcomingData.results,
          ].some((list) => list.some((item) => item.id === movie.id))
        );

        if (searchedMovie) {
          setSearchResults([
            searchedMovie,
            ...searchData.results.filter(
              (movie) => movie.id !== searchedMovie.id
            ),
          ]);
        } else {
          setSearchResults(searchData.results);
        }
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="search-main-card">
      {searchResults.length > 0 ? (
        <ul className="search-results-list">
          {searchResults.map((movie) => (
            <li key={movie.id} className="search-result-item">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="search-poster"
              />
              <div className="search-text-card">
                <h1 className="search-movie-title">{movie.title}</h1>
                <p className="search-rating">Rating: {movie.vote_average}</p>
                <p className="search-overview">{movie.overview}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-results">No results found for "{searchQuery}"</p>
      )}
    </div>
  );
};

export default SearchPage;
