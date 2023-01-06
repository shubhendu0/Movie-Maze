const useGenre = (selectedGenres, value) => {
  if (selectedGenres.length < 1) return "";

  let GenreIds;
  if(value === 'name') {
    GenreIds = selectedGenres.map((g) => g.name);
  } else {
    GenreIds = selectedGenres.map((g) => g.id);
  }
  
  return GenreIds.reduce((acc, curr) => acc + "," + curr);
};

export default useGenre;
