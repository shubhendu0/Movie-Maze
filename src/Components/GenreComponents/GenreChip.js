import React, { useEffect } from "react";
import deleteIcon from "../../Images/deleteIcon.png";

const GenreChip = (props) => {
  const { genre, func, selected } = props;

  function clickHandler() {
    func(genre);
  }

  useEffect(() => {
    document.getElementById("");
  }, []);

  if (selected) {
    return (
      <div className="selected-chips">
        <span className="genre-name">{genre.name}</span>
        <img src={deleteIcon} alt={"deleteLogo"} onClick={clickHandler} />
      </div>
    );
  } else {
    return (
      <div className="chips" onClick={clickHandler}>
        <span className="genre-name">{genre.name}</span>
      </div>
    );
  }
};

export default GenreChip;
