// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import "./DetailPage.css";

// const DetailPage = () => {
//   const { movieId } = useParams();
//   const [movieDetails, setMovieDetails] = useState(null);
//   const [cast, setCast] = useState([]);
//   const [crew, setCrew] = useState([]);
//   const [showAllCast, setShowAllCast] = useState(false);

//   useEffect(() => {
//     const fetchMovieDetails = async () => {
//       try {
//         const response = await fetch(
//           `https://api.themoviedb.org/3/movie/${movieId}?api_key=78863c68ef90fc87b6f074f5c1b554d7&language=en-US`
//         );
//         const data = await response.json();
//         setMovieDetails(data);
//       } catch (error) {
//         console.error("Error fetching movie details:", error);
//       }
//     };

//     const fetchMovieCredits = async () => {
//       try {
//         const response = await fetch(
//           `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=78863c68ef90fc87b6f074f5c1b554d7&language=en-US`
//         );
//         const data = await response.json();
//         setCast(data.cast);
//         setCrew(data.crew);
//       } catch (error) {
//         console.error("Error fetching movie credits:", error);
//       }
//     };

//     fetchMovieDetails();
//     fetchMovieCredits();
//   }, [movieId]);

//   const renderCast = () => {
//     const castToShow = showAllCast ? cast : cast.slice(0, 6);
//     return (
//       <div className={`cast-list ${showAllCast ? "column" : "row"}`}>
//         {castToShow.map((actor) => (
//           <div className="cast-item" key={actor.id}>
//             <div className="actor-card">
//               <img
//                 src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
//                 alt={actor.name}
//               />
//             </div>
//             <p className="actor-name">{actor.name}</p>
//             <p className="char">character {actor.character}</p>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="detail-page">
//       {movieDetails && (
//         <div className="background-container">
//           <div className="bg-img">
//           <img
//             src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
//             alt={movieDetails.title}
//             className="background-image"
//           />
//           </div>
//           <div className="content-container">
//             <div className="sub-card">
//               {movieDetails.poster_path && (
//                 <img
//                   src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
//                   alt={movieDetails.title}
//                   className="detail-small-poster"
//                 />
//               )}
//               <div className="text-container">
//                 <h1 className="venom">Venom:{movieDetails.title}</h1>
//                 <p className="release-date">
//                   Release Date: {movieDetails.release_date}
//                 </p>
//                 <p className="rating">Rating: {movieDetails.vote_average}</p>
//                 <p className="time">
//                   {" "}
//                   {movieDetails.runtime} min {""}
//                   {movieDetails.genres.map((genre) => genre.name).join(", ")}
//                 </p>
//               </div>
//             </div>
//             <div className="over-card">
//               <p className="overview">Overview: {movieDetails.overview}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="section">
//         <h1 className="cast">Cast</h1>
//         {renderCast()}
//         {!showAllCast && cast.length > 6 && (
//           <div className="see-more" onClick={() => setShowAllCast(true)}>
//             See More <i className="fas fa-chevron-down"></i>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DetailPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DetailPage.css";

const DetailPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [showAllCast, setShowAllCast] = useState(false);
  const [showCrew, setShowCrew] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=78863c68ef90fc87b6f074f5c1b554d7&language=en-US`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    const fetchMovieCredits = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=78863c68ef90fc87b6f074f5c1b554d7&language=en-US`
        );
        const data = await response.json();
        setCast(data.cast);
        setCrew(data.crew);
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieCredits();
  }, [movieId]);

  const renderCast = () => {
    const castToShow = showAllCast ? cast : cast.slice(0, 6);
    const crewToShow = showCrew ? crew : [];

    return (
      <div>
        {/* Cast Section */}
        <h1 className="cast">Cast</h1>
        <div className={`cast-list ${showAllCast ? "column" : "row"}`}>
          {castToShow.map((actor) => (
            <div className="cast-item" key={actor.id}>
              <div>
                <div className="actor-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                  />
                </div>
                <div className="detail-name-card">
                  <p className="actor-name">{actor.name}</p>
                  <p className="char">Character: {actor.character}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Crew Section */}
        {showCrew && (
          <div className={`crew-list column`}>
            <h1 className="crew">Crew</h1>
            {crewToShow.map((member) => (
              <div className="crew-item" key={member.id}>
                <div className="member-card">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                    alt={member.name}
                  />
                </div>
                <p className="member-name">{member.name}</p>
                <p className="job">{member.job}</p>
              </div>
            ))}
          </div>
        )}

        {!showAllCast && cast.length > 6 && (
          <div className="see-more" onClick={() => setShowAllCast(true)}>
            See More Cast <i className="fas fa-chevron-down"></i>
          </div>
        )}

        {!showCrew && (
          <div className="see-more" onClick={() => setShowCrew(true)}>
            See More Crew <i className="fas fa-chevron-down"></i>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="detail-page">
      {movieDetails && (
        <div className="background-container">
          <div className="bg-img">
            <img
              src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
              alt={movieDetails.title}
              className="background-image"
            />
          </div>
          <div className="content-container">
            <div className="sub-card">
              {movieDetails.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                  alt={movieDetails.title}
                  className="detail-small-poster"
                />
              )}
              <div className="text-container">
                <h1 className="venom">Venom:{movieDetails.title}</h1>
                <p className="release-date">
                  Release Date: {movieDetails.release_date}
                </p>
                <p className="rating">Rating: {movieDetails.vote_average}</p>
                <p className="time">
                  {" "}
                  {movieDetails.runtime} min {""}
                  {movieDetails.genres.map((genre) => genre.name).join(", ")}
                </p>
              </div>
            </div>
            <div className="over-card">
              <p className="overview">Overview: {movieDetails.overview}</p>
            </div>
          </div>
        </div>
      )}

      <div className="section">{renderCast()}</div>
    </div>
  );
};

export default DetailPage;
