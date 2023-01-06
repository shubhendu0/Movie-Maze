/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import GenreChip from "./GenreChip";
import getData from "../../Functions/getData";

const GenreList = (props) => {
  const {
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
    setPage,
  } = props;
  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((g) => g.id !== genre.id));
    setPage(1);
  };

  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  useEffect(() => {
    setSelectedGenres([]);
    setGenres([]);
    getData('GenreList', 0, setGenres, "", "", type);

    return () => {
      setGenres([]);
    };
  }, [type]);

  return (
    <div className="genreListContainer">
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <GenreChip
            key={genre.id}
            genre={genre}
            func={handleRemove}
            selected={true}
          />
        ))}
      {genres &&
        genres.map((genre) => (
          <GenreChip
            key={genre.id}
            genre={genre}
            func={handleAdd}
            selected={false}
          />
        ))}
    </div>
  );
};

export default GenreList;
