/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = (props) => {
  const { input, setInput, setSearchType } = props;
  const navigate = useNavigate();
  const placeholder = [
    "Search for movies e.g Avengers, Eternals",
    "Search for shows e.g Suits, Mirzapur",
  ];

  const [type, setType] = useState("Trending");
  const inputRef = useRef("");

  function changeMediaType(event) {
    let value = event.target.innerText;
    setType(value);
    if(value === 'Movies' || value === 'Shows') {
      setSearchType(value)
    }
  }

  function inputHandler() {
    if (type === "Trending" || type === 'Genre') {
      setType("Movies");
      navigate("/search");
    }
  }

  function inputChange(event) {
    setInput(event.target.value);
  }

  useEffect(() => {
    const divs = document.getElementsByClassName("nav-heading");
    for (let i = 0; i < 4; i++) {
      if (divs[i].innerText === type) {
        divs[i].classList.add("active");
      } else {
        divs[i].classList.remove("active");
      }
    }
    if (type === "Trending" || type === 'Genre') {
      setInput("");
      inputRef.current.blur();
    } else {
      inputRef.current.focus();
    }
  }, [type]);

  return (
    <nav className="nav-bar">
      <Link className="link" to="/">
        <div className="nav-heading active" onClick={changeMediaType}>
          Trending
        </div>
      </Link>
      <Link className="link" to="/search">
        <div className="nav-heading" onClick={changeMediaType}>
          Movies
        </div>
      </Link>
      <Link className="link" to="/search">
        <div className="nav-heading" onClick={changeMediaType}>
          Shows
        </div>
      </Link>
      <Link className="link" to="/genre" onClick={changeMediaType}>
        <div className="nav-heading">
          Genre
        </div>
      </Link>
      <div className="nav-search">
        <input
          ref={inputRef}
          value={input}
          className="nav-input"
          placeholder={type === "Shows" ? placeholder[1] : placeholder[0]}
          onClick={inputHandler}
          onChange={inputChange}
          id="input"
          autoComplete="off"
        />
      </div>
    </nav>
  );
};

export default NavigationBar;
