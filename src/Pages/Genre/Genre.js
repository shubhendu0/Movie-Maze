/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Type from "../../Components/GenreComponents/Type";
import GenreList from "../../Components/GenreComponents/GenreList";
import useGenre from "../../Hooks/useGenre";
import SingleMovie from "../../Components/SingleMovie/SingleMovie";
import Pagination from "../../Components/Pagination/Pagination";
import NoResult from "../../Components/NoResult/NoResult";
import getData from "../../Functions/getData";
import Loader from "../../Components/Loader/Loader";
import changePaginationColor from "../../Functions/changePaginationColor";

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("Movies");
  const [data, setData] = useState([]);
  const genreForURL = useGenre(selectedGenres, "id");
  const [totalResults, setTotalResults] = useState(0);
  const [loader, setLoader] = useState(false);

  let noResult = false;
  if (data !== undefined && data.length === 0) {
    noResult = true;
  }

  useEffect(() => {
    window.scroll(0, 0);
    (async () => {
      setLoader(true);
      await getData("Genre", page, setData, setTotalResults, genreForURL, type);
      setLoader(false);
    })();
    paginate();
  }, [genreForURL, page, type]);

  function paginate() {
    changePaginationColor(page);
    window.scroll(0, 0);
  }

  return (
    <>
      <div className={"genreContainer"}>
        <Type setType={setType} />
        <h1 className={"heading"}>Displaying {type}</h1>
        <h2 className={"subheading"}>
          You can select multiple genre from the tab below
        </h2>
        <GenreList
          type={type}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />
      </div>
      <div className="grid">
        {loader && <Loader />}
        {data &&
          !loader &&
          data.map((movie) => {
            return (
              <SingleMovie
                id={movie.id}
                name={movie.name || movie.title}
                poster={movie.poster_path}
                date={movie.first_air_date || movie.release_date}
                type={type === "Movies" ? "movie" : "tv"}
                rating={movie.vote_average}
                key={movie.id}
              />
            );
          })}
      </div>
      {noResult && (
        <NoResult
          type={type}
          totalResults={type === "Movies" ? "806,638 movies" : "138,827 shows"}
        />
      )}
      <Pagination totalPosts={totalResults} setPage={setPage} />
    </>
  );
};

export default Genre;
