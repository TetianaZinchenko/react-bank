import React from "react";

import "./index.css";

const ButtonIcons = ({ src, alt, className, onClick }) => {
  const handleClick = (error) => {
    if (onClick) {
      error.preventDefault();
      onClick();
    }
  };

  return (
    <button onClick={handleClick} className={`button__icon ${className}`}>
      <img src={src} alt={alt} />
    </button>
  );
};

export default ButtonIcons;
