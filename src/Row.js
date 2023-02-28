import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";
import movieTrailer from "movie-trailer";
import YouTube from "react-youtube";

const baseURL = "https://image.tmdb.org/t/p/original/";
// https:api.themoviedb.org/3/trending/all/week?api_key=9a8c00fd659bccf055ec24062debfdc1&language=en-US

function Row({ title, fetchurl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerurl, setTrailerurl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchurl);
      setMovies(request.data.results);
      // console.log(request);
      return request;
    }
    fetchData();
  }, [fetchurl]);

  const opts = {
    height: "390",
    width: "100%",
    playervars: {
      autoplay: 1,
    },
  };

  // console.log(movies);

  const handleClick = (movie) => {
    if (trailerurl) {
      setTrailerurl("");
    } else {
      movieTrailer(movie?.title || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerurl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h1>{title}</h1>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${baseURL}${
              isLargeRow ? movie?.poster_path : movie?.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>

      <div style={{ padding: "40px" }}>
        {trailerurl && <YouTube videoId={trailerurl} opt={opts} />}
      </div>
    </div>
  );
}

export default Row;

// import React, { useEffect, useState } from "react";
// import axios from "./axios";
// import "./Row.css";
// import movieTrailer from "movie-trailer";
// import YouTube from "react-youtube";

// const base_url = "https://image.tmdb.org/t/p/original";

// function Row({ title, fetchUrl, largeRow }) {
//   const [movies, setMovies] = useState([]);
//   const [trailerUrl, setTrailerUrl] = useState("");
//   useEffect(() => {
//     async function fetchData() {
//       const request = await axios.get(fetchUrl);
//       setMovies(request.data.results);
//       return request;
//     }
//     fetchData();
//   }, [fetchUrl]);

//   const opts = {
//     height: "390",
//     width: "100%",
//     playerVars: {
//       autoplay: 1,
//     },
//   };
//   const handleClick = (movie) => {
//     if (trailerUrl) {
//       setTrailerUrl("");
//     } else {
//       movieTrailer(movie?.original_name || movie?.title || "")
//         .then((url) => {
//           const urlParams = new URLSearchParams(new URL(url).search);
//           setTrailerUrl(urlParams.get("v"));
//         })
//         .catch((error) => console.log(error));
//     }
//   };

//   return (
//     <div className="row">
//       <h1>{title}</h1>

//       <div className="row__posters">
//         {movies.map((movie) => (
//           <img
//             key={movie.id}
//             onClick={() => handleClick(movie)}
//             className={`row__poster ${largeRow && "row__posterLarge"}`}
//             src={`${base_url}${
//               largeRow ? movie.poster_path : movie.backdrop_path
//             }`}
//             alt={movie.name}
//           />
//         ))}
//       </div>

//       <div className="row__youtube">
//         {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
//       </div>
//     </div>
//   );
// }

// export default Row;
