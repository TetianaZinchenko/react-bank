import styled from "@emotion/styled";

export const BalancePageStyle = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 201px;
  width: 393px;
  background-image: url("../../img/balance-bg.svg");
  border-radius: 24px 24px 0 0;
  color: ${(props) => props.theme.colors.white};
`;

export const HeaderAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding-top: 60px;
  padding-inline: 20px;
`;

export const HeaderTitle = styled.span`
  font-size: ${(props) => props.theme.fontSizes[2]}px;
`;

export const Sum = styled.div`
  display: flex;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes[8]}px;
  font-weight: ${(props) => props.theme.fontWeights.bold};
`;

export const TransferBlock = styled.div`
  position: absolute;
  top: 175px;
  right: 114px;
  display: flex;
  gap: 12px;
`;

export const TransferWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TransferTitle = styled.span`
  font-size: ${(props) => props.theme.fontSizes[1]}px;
  color: ${(props) => props.theme.colors.lightBlack};
`;

export const Transactions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 72px;
  padding: 0 20px;
`;
