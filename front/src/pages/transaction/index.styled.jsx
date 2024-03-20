import styled from "@emotion/styled";

export const CardNotification = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${(props) => props.theme.colors.white};
  padding: 10px 4px;
  border-radius: 12px;
  justify-content: space-between;
  cursor: pointer;

  .transaction-amount-green {
    color: ${(props) => props.theme.colors.green};
    font-size: ${(props) => props.theme.fontSizes[4]}px;
  }

  .transaction-amount {
    color: ${(props) => props.theme.colors.lightBlack};
    font-size: ${(props) => props.theme.fontSizes[4]}px;
    justify-self: end;
  }
`;

export const TransactionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TransactionIcon = styled.img`
  display: block;
  width: 48px;
  height: 48px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const TransactionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TransactionName = styled.h2`
  font-size: ${(props) => props.theme.fontSizes[2]}px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
  color: ${(props) => props.theme.colors.lightBlack};
`;

export const SubtitleBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const TransactionSubtitle = styled.span`
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

export const TransactionType = styled.span`
  font-size: ${(props) => props.theme.fontSizes[1]}px;
  color: ${(props) => props.theme.colors.gray};
`;
