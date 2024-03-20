import styled from "@emotion/styled";

export const WelcomePageStyle = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  border-radius: 24px;
  position: relative;
  overflow: hidden;
`;

export const MainBlock = styled.div`
  height: 743px;
  width: 393px;
  background-image: url("../../img/welcome-bg.svg");
  border-radius: 24px;
  color: ${(props) => props.theme.colors.white};
`;

export const WelcomeWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  margin-top: 107px;
`;

export const WelcomeTitle = styled.h1`
  font-size: ${(props) => props.theme.fontSizes[10]}px;
  font-weight: ${(props) => props.theme.fontWeights.semibold};
`;

export const WelcomeText = styled.span`
  font-size: ${(props) => props.theme.fontSizes[4]}px;
`;

export const ActionBlock = styled.div`
  height: 40%;
  background: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding-top: 80px;
`;

export const Logo = styled.img`
  position: absolute;
  left: -212px;
  top: -28px;
`;
