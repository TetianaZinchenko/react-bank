import styled from "@emotion/styled";

export const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  width: 353px;
  height: 56px;
  text-decoration: none;
  text-align: center;
  border: 1px solid ${(props) => props.theme.colors.purple};
  border-radius: 12px;
  font-size: ${(props) => props.theme.fontSizes[2]}px;
  font-weight: ${(props) => props.theme.fontWeights.medium};
  cursor: pointer;
  transition: opacity 0.3s ease;
  z-index: 1;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.4;
  }
`;
