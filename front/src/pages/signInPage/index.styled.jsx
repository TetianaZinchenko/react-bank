import styled from "@emotion/styled";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

export const LinkPrefix = styled.div`
  font-size: ${(props) => props.theme.fontSizes[1]}px;
  color: ${(props) => props.theme.colors.lightBlack};
`;
