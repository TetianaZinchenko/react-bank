import styled from "@emotion/styled";

export const AlertStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 0 auto;

  border: 1px solid ${(props) => props.theme.colors.transparent};
  border-radius: 10px;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.lightYellow};
  color: ${(props) => props.theme.colors.yellow};
  width: 353px;
`;

export const AlertIcon = styled.img`
  width: 16px;
  height: 16px;
`;

export const AlertMessage = styled.span`
  font-size: ${(props) => props.theme.fontSizes[1]}px;
`;
