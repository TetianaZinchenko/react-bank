import styled from "@emotion/styled";

export const HeadingBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  margin-top: 24px;
  margin-bottom: 32px;
`;

export const Title = styled.h1`
  font-size: ${(props) => props.theme.fontSizes[5]}px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.dark};
`;

export const Subtitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes[1]}px;
  color: ${(props) => props.theme.colors.gray};
`;
