import styled from "@emotion/styled";

export const NotificationsPageStyle = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 24px;
  height: 100%;
`;

export const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  margin-top: 32px;
  padding: 0 20px;
`;
