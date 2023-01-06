import React, { useState } from "react";
import star from "../../Images/star.png";
import getData from "../../Functions/getData";
import Modal from "../Modal/Modal";

const SingleMovie = (props) => {
  const { id, name, poster, date, type, rating } = props;
  const [data, setData] = useState();
  const [video, setVideo] = useState();
  const [openModal, setOpenModal] = useState(false);
  const imageUrl = [
    "https://image.tmdb.org/t/p/w300",
    "https://www.movienewz.com/img/films/poster-holder.jpg",
  ];

  function showContent() {
    getData("Data", 0, setData, "", id, type);
    getData("Video", 0, setVideo, "", id, type);
    setOpenModal(true);
  }

  // function hideContent() {
  //   setOpenModal(false);
  // }

  let mediaType;
  if (type === "tv") {
    mediaType = "TV Series";
  } else {
    mediaType = "Movie";
  }

  return (
    <>
      <div className="singleMovie" onClick={showContent} >
        <img
          src={poster ? `${imageUrl[0]}/${poster}` : imageUrl[1]}
          alt={name}
        />
        <div className="movieInfo">
          <div className="movie-date">
            {!date ? "N/A" : date.slice(0, 4)}
          </div>
          <div className="movie-type">{mediaType}</div>
          <div className="movie-rating">
            <img src={star} alt={"star-logo"} />
            {rating.toFixed(1)}
          </div>
        </div>
        <h3>{name}</h3>
      </div>
      {openModal && data && <Modal setOpenModal={setOpenModal} data={data} video={video}/>}
    </>
  );
};

export default SingleMovie;
