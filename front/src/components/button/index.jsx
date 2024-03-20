import React from "react";

import "./index.css";

import { ButtonStyled } from "./index.styled";

const Button = ({ text, className, onClick, disabled, children = null }) => {
  const handleClick = (error) => {
    if (onClick) {
      error.preventDefault();
      onClick();
    }
  };

  return (
    <ButtonStyled
      onClick={handleClick}
      disabled={disabled}
      className={`${className}`}
    >
      {text}
      {children}
    </ButtonStyled>
  );
};

export default Button;
