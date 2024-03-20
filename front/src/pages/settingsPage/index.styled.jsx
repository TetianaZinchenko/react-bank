import styled from "@emotion/styled";

export const ChangeBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin-top: 32px;
  padding: 0 20px;
`;

export const SettingsTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes[2]}px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.black};
`;

export const Divider = styled.hr`
  border: 1px solid ${(props) => props.theme.colors.lightGray};
  padding-inline: 20px;
  width: 87%;
`;
