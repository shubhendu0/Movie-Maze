/* eslint-disable array-callback-return */
import axios from "axios";

export default async function getData(
  section,
  page,
  setData,
  setTotalResults,
  id,
  type
) {
  if (type !== undefined) {
    type = type.toLowerCase();
    if (type === "movies" || type === "movie") {
      type = "movie";
    } else {
      type = "tv";
    }
  }

  let url;
  switch (section) {
    case "Trending":
      url = `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`;
      break;
    case "Movies":
      url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${id}&page=${page}&include_adult=false`;
      break;
    case "Shows":
      url = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${id}&page=${page}&include_adult=false`;
      break;
    case "GenreList":
      url = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
      break;
    case "Genre":
      url = `https://api.themoviedb.org/3/discover/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${id}`;
      break;
    case "Data":
      url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
      break;
    case "Video":
      url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
      break;
    case "Cast":
      url = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
      break;
    default:
      break;
  }

  const response = await (await axios.get(url)).data;
  if (section === "GenreList") {
    setData(response.genres);
    return;
  }
  if (section === "Data") {
    setData(response);
    return;
  }
  if (section === "Video") {
    let path = null;
    if(response.results.length === 0) {
      setData(null);
      return;
    }
    response.results.map((video) => {
      if (video.name.includes("Trailer")) {
        path = video.key;
      }
    });
    setData(path !== null ? path : response.results[0].key);
    return;
  }
  if (section === "Cast") {
    let castArr = response.cast;
    let result = castArr.map((actor, index) => {
      if (index <= 3) {
        return ({ name: actor.name, poster: actor.profile_path });
      }
    });
    result = result.slice(0, 4)
    setData(result);
    return;
  }
  setTotalResults(response.total_results);
  setData(response.results);
}
