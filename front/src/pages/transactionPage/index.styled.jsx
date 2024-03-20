import styled from "@emotion/styled";

export const NotificationsPage = styled.div`
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

export const TransactionSum = styled.div`
  margin: 0 auto;
  font-size: ${(props) => props.theme.fontSizes[8]}px;
  color: ${(props) => props.theme.colors.green};
`;

export const TransactionRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const TransactionInformation = styled.div`
  margin: 0 auto;
  margin-top: 25px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  width: 100%;
  gap: 5px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;
`;
