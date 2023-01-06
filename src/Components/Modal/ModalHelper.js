import React from "react";
import star from "../../Images/star-modal.png";
import Actor from "./Actor";
import YoutubeIcon from "../../Images/youtubeIcon.png";

const ModalHelper = (props) => {
  const {
    poster,
    video,
    name,
    releaseDate,
    genres,
    runtime,
    rating,
    overview,
    cast,
    setOpenModal,
  } = props;

  const imageUrl = [
    "https://image.tmdb.org/t/p/w300",
    "https://www.movienewz.com/img/films/poster-holder.jpg",
  ];

  function playTrailer() {
    if (video === null) {
      window.open(
        `https://www.youtube.com/results?search_query=${name}trailer`
      );
    } else {
      window.open(`https://www.youtube.com/watch?v=${video}`, "_blank");
    }
  }

  return (
    <div className="modal">
      <div className="left-section">
        <img src={poster ? `${imageUrl[0]}/${poster}` : imageUrl[1]} alt="" />
        <button onClick={playTrailer} className="youTube">
          <img src={YoutubeIcon} alt="youtube-icon" />
          <span>Watch Trailer</span>
        </button>
        <button onClick={() => setOpenModal(false)}>Back to Results</button>
      </div>
      <div className="right-section">
        <h1>{name}</h1>
        <div className="modal-info">
          <div>{releaseDate}</div>
          <div className="modal-genre">{genres}</div>
          <div>{runtime}</div>
        </div>
        <div className="rating">
          <h6>
            Rating :<img src={star} alt="ratingLogo" />
            <span className="rating-value">
              {rating === "0.0" ? "N/A" : rating}
            </span>
          </h6>
        </div>
        <p className="overview">{overview}</p>
        <hr />
        <div className="actorList">
          {cast.map((actor, index) => {
            return (
              <Actor
                key={index}
                name={actor.name}
                poster={actor.poster}
                url={imageUrl[0]}
              />
            );
          })}
        </div>
        <button className="smallModal-btn" onClick={() => setOpenModal(false)}>Back to Results</button>
      </div>
    </div>
  );
};

export default ModalHelper;
