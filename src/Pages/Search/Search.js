/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import SingleMovie from "../../Components/SingleMovie/SingleMovie";
import Pagination from "../../Components/Pagination/Pagination";
import EmptySearch from "../../Components/EmptySearch/EmptySearch";
import NoResult from "../../Components/NoResult/NoResult";
import changePaginationColor from "../../Functions/changePaginationColor";
import getData from "../../Functions/getData";
import Loader from "../../Components/Loader/Loader";

const Search = (props) => {
  let { input, searchType } = props;
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (input === "") return;
    (async () => {
      setLoader(true);
      await getData(searchType, page, setData, setTotalResults, input);
      setLoader(false);
    })();
    paginate();
  }, [page]);

  useEffect(() => {
    if (input === "") {
      setData([]);
      return;
    }
    setPage(1);
    (async () => {
      setLoader(true);
      await getData(searchType, page, setData, setTotalResults, input);
      setLoader(false);
    })();
    paginate();

    return () => {
      setData([]);
    };
  }, [input, searchType]);

  let emptySearch = false;
  let noResult = false;
  if (data !== undefined && data.length === 0) {
    input === "" ? (emptySearch = true) : (noResult = true);
  }

  function paginate() {
    changePaginationColor(page);
    window.scroll(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  let NoResultMovieProps = ["movie", "806,638 movies"];
  let NoResultShowProps = ["show", "138,827 shows"];

  return (
    <>
      {!loader && emptySearch && <EmptySearch />}
      {!loader && noResult && (
        <NoResult
          input={input}
          type={
            searchType === "Movies"
              ? NoResultMovieProps[0]
              : NoResultShowProps[0]
          }
          totalResults={
            searchType === "Movies"
              ? NoResultMovieProps[1]
              : NoResultShowProps[1]
          }
        />
      )}
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
                type={searchType === "Movies" ? "movie" : "tv"}
                rating={movie.vote_average}
                key={movie.id}
              />
            );
          })}
      </div>
      <Pagination totalPosts={totalResults} setPage={setPage} />
    </>
  );
};

export default Search;
