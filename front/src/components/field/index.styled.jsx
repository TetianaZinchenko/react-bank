import styled from "@emotion/styled";

export const FieldLabel = styled.label`
  font-size: ${(props) => props.theme.fontSizes[1]}px;
  color: ${(props) => props.theme.colors.lightBlack};
`;

export const FieldWrapper = styled.div`
  display: grid;
  width: 100%;
  position: relative;
`;

export const FieldInput = styled.input`
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  border-radius: 12px;
  padding: 16px;
  transition: border-color 0.3s;
  padding-right: calc(18px + 18px + 18px);

  &:focus {
    border-color: ${(props) => props.theme.colors.purple};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.gray};
  }
`;

export const FieldIcon = styled.div`
  display: block;
  height: 20px;
  width: 20px;

  background-size: cover;
  cursor: pointer;
  transition: opacity 0.7s;

  position: absolute;
  right: 18px;
  top: 20px;

  &:hover {
    opacity: 0.7;
  }
`;

export const ErrorText = styled.div`
  margin-top: 8px;
`;
