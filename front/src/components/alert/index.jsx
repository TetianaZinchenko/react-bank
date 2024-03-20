import React from "react";

import alert from "../../img/alert.svg";

import { AlertStyle, AlertIcon, AlertMessage } from "./index.styled";

const Alert = ({ text }) => {
  return (
    <AlertStyle>
      <AlertIcon src={alert} alt="alert" />
      <AlertMessage>{text}</AlertMessage>
    </AlertStyle>
  );
};

export default Alert;
