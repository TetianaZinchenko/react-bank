import styled from "@emotion/styled";

export const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const SystemWrap = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const IconText = styled.span`
  font-size: ${(props) => props.theme.fontSizes[2]}px;
  font-weight: ${(props) => props.theme.fontWeights.medium};
  color: ${(props) => props.theme.colors.lightBlack};
`;

export const Icons = styled.div`
  display: flex;
  gap: 8px;
`;

export const Icon = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
