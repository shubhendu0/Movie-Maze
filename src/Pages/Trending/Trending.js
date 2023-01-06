/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import SingleMovie from "../../Components/SingleMovie/SingleMovie";
import Pagination from "../../Components/Pagination/Pagination";
import changePaginationColor from "../../Functions/changePaginationColor";
import getData from "../../Functions/getData";
import Loader from "../../Components/Loader/Loader";

const Trending = () => {
  const [data, setData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    (async () => {
      setLoader(true);
      await getData('Trending', page, setData, setTotalResults);
      setLoader(false);
    })();
    paginate();

    
  }, [page]);

  function paginate() {
    changePaginationColor(page)
    window.scroll(0,0);
  }

  return (
    <>
      <div className="grid">
        {loader && <Loader />}
        {data && !loader &&
          data.map((movie) => {
            return (
              <SingleMovie
                id={movie.id}
                name={movie.name || movie.title}
                poster={movie.poster_path}
                date={movie.first_air_date || movie.release_date}
                type={movie.media_type}
                rating={movie.vote_average}
                key={movie.id}
              />
            );
          })}
      </div>
      <Pagination
        totalPosts={totalResults}
        setPage={setPage}
      />
    </>
  );
};

export default Trending;
