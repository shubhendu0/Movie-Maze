import React from "react";

const LoaderCard = () => {
  return (
    <div className="loader-card">
      <div className="loader-image skeleton"></div>
      <div className="loader-info">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </div>
      <div className="loader-header skeleton"></div>
    </div>
  );
};

export default LoaderCard;
