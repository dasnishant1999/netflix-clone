import React, { useState, useEffect } from "react";

import YouTube from "react-youtube";
import movietrailer from "movie-trailer";

import axios from "../services/axios";
import "./Row.css";

const base_url = "http://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLarge }) {
  //hooks
  const [movies, setmovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setmovies(request.data.results);
      return request;
    }
    fetchData();
    return () => {
      // cleanup
    };
  }, [fetchUrl]);

  const opts = {
    height: "390px",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  //this is a complex function to get to for beginners
  const handleTrailer = (movie) => {
    if (trailerUrl) {
      settrailerUrl("");
    } else {
      movietrailer(movie.name || "")
        .then((url) => {
          // this is very new to me
          const urlParams = new URLSearchParams(new URL(url).search);
          settrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2 style={{ margin: "10px" }}>{title}</h2>
      <h2>changes done</h2>
      <div className="row_posters">
        {movies.map((movie) => {
          return (
            <img
              onClick={() => handleTrailer(movie)}
              key={movie.id}
              className={`image ${isLarge && "imageLarge"}`}
              src={`${base_url}${
                isLarge ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              width="100px"
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}
    </div>
  );
}

export default Row;
