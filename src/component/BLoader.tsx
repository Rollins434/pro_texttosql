import React from "react";
import "../Loader.css"; // Import the CSS file

const BLoader = () => {
  return (
    <div role="status" className="loader">
      <div className="loader-bar loader-bar-1"></div>
      <div className="loader-bar loader-bar-2"></div>
      <div className="loader-bar loader-bar-3"></div>
      <div className="loader-bar loader-bar-4"></div>
      <div className="loader-bar loader-bar-5"></div>
      <div className="loader-bar loader-bar-6"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default BLoader;
