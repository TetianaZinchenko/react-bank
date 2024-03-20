import styled from "@emotion/styled";

export const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: left;
  background-color: ${(props) => props.theme.colors.white};
  padding: 16px;
  border-radius: 12px;
`;

export const NotificationIcon = styled.img`
  display: block;
  width: 40px;
  height: 40px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const NotificationTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes[2]}px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.lightBlack};
`;

export const SubtitleBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const NotificationSubtitle = styled.span`
  font-size: ${(props) => props.theme.fontSizes[0]}px;
  color: ${(props) => props.theme.colors.gray};
`;

export const Dot = styled.span`
  content: "";
  display: block;
  width: 2px;
  height: 2px;
  background-color: ${(props) => props.theme.colors.gray};
  border-radius: 50%;
`;
