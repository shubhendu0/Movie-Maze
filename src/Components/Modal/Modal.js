/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import ModalHelper from "./ModalHelper";
import useGenre from "../../Hooks/useGenre";
import getData from "../../Functions/getData";
export default function Modal(props) {
  const [cast, setCast] = useState([]);
  const { setOpenModal, data, video } = props;
  const { vote_average, poster_path, overview, genres } = data;
  let name = data.title || data.name;
  let date = data.release_date || data.first_air_date;
  let genre = genres.slice(0, 3);
  genre = useGenre(genre, "name");
  let runtime = data.runtime || data.number_of_seasons;
  if (runtime > 15) {
    runtime = minToHourFormat(runtime);
  } else {
    runtime = `${runtime} Season`;
  }
  let rating = vote_average.toFixed(1);

  function minToHourFormat(time) {
    let h = Math.trunc(time / 60);
    let m = time % 60;
    let hDisplay = h > 0 ? h + (h === 1 ? " Hour " : " Hours ") : "";
    let mDisplay = m > 0 ? m + (m === 1 ? " Minute " : " Minutes ") : "";
    return hDisplay + mDisplay;
  }

  useEffect(() => {
    function onKeyDown(event) {
      if (event.keyCode === 27) {
        setOpenModal(false);
      }
    }
    let type;
    if(data.name) {
      type = 'tv';
    } else {
      type = 'movie';
    }
    getData(
      "Cast",
      0,
      setCast,
      "",
      data.id,
      type
    );
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "visible";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return ReactDom.createPortal(
    <>
      <div className="overlay">
      <ModalHelper
            poster={poster_path}
            video={video}
            name={name}
            releaseDate={date}
            genres={genre}
            runtime={runtime}
            rating={rating}
            overview={overview}
            cast={cast}
            setOpenModal={setOpenModal}
          />
      </div>
    </>,
    document.getElementById("portal")
  );
}
