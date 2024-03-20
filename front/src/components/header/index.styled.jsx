import styled from "@emotion/styled";

export const PageName = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  align-items: center;
`;

export const PageTitle = styled.h1`
  margin-top: 60px;
  margin-left: 128px;

  font-size: ${(props) => props.theme.fontSizes[4]}px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.lightBlack};
`;
