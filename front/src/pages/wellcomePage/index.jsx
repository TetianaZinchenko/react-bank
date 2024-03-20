import React from "react";
import { useNavigate } from "react-router-dom";

import Wrapper from "../../components/wrapper";
import Button from "../../components/button";

import money from "../../img/money.svg";

import {
  WelcomePageStyle,
  MainBlock,
  WelcomeWrap,
  WelcomeTitle,
  WelcomeText,
  ActionBlock,
  Logo,
} from "./index.styled";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    <Wrapper>
      <WelcomePageStyle>
        <MainBlock>
          <WelcomeWrap>
            <WelcomeTitle>Hello!</WelcomeTitle>
            <WelcomeText>Welcome to bank app</WelcomeText>
          </WelcomeWrap>
        </MainBlock>

        <ActionBlock>
          <Button
            onClick={handleSignUp}
            text="Sign Up"
            className="button--center button--primary"
          />
          <Button
            onClick={handleSignIn}
            text="Sign In"
            className="button--center button--secondary"
          />
        </ActionBlock>

        <Logo src={money} alt="Money logo" />
      </WelcomePageStyle>
    </Wrapper>
  );
};

export default WelcomePage;
