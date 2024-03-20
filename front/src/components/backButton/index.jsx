import { useNavigate } from "react-router-dom";

import back from "../../img/arrow-back.svg";

import { BackButtonStyled } from "./index.styled";

const BackButton = () => {
  const navigate = useNavigate();
  const backButton = () => {
    navigate(-1);
  };

  return (
    <BackButtonStyled onClick={backButton}>
      <img src={back} alt="Go back" width="24" height="24" />
    </BackButtonStyled>
  );
};

export default BackButton;
