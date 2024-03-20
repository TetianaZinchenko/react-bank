import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import authContext from "../../contexts/authContext";

import Transaction from "../transaction";

import Wrapper from "../../components/wrapper";
import ButtonIcons from "../../components/buttonIcons";

import settings from "../../img/settings.svg";
import notifications from "../../img/notifications.svg";
import receive from "../../img/balance-receive.svg";
import send from "../../img/balance-send.svg";

import "./index.css";

import {
  BalancePageStyle,
  HeaderBlock,
  HeaderAction,
  HeaderTitle,
  Sum,
  TransferBlock,
  TransferWrap,
  TransferTitle,
  Transactions,
} from "./index.styled";

const BalancePage = () => {
  const navigate = useNavigate();

  const { state } = useContext(authContext);

  const handleSettingsButtonClick = () => {
    navigate("/settings");
  };

  const handleNotificationsButtonClick = () => {
    navigate("/notifications");
  };

  const handleReceiveButtonClick = () => {
    navigate("/recive");
  };

  const handleSendButtonClick = () => {
    navigate("/send");
  };

  return (
    <Wrapper>
      <BalancePageStyle>
        <HeaderBlock>
          <HeaderAction>
            <ButtonIcons
              src={settings}
              alt="settings"
              className="settings-icon"
              onClick={handleSettingsButtonClick}
            />
            <HeaderTitle>Main wallet</HeaderTitle>
            <ButtonIcons
              src={notifications}
              alt="notifications"
              className="notifications-icon"
              onClick={handleNotificationsButtonClick}
            />
          </HeaderAction>
          <Sum>
            {state.currentUser &&
              `$${parseFloat(state.currentUser.userData.balance).toLocaleString(
                "en-US",
                { minimumFractionDigits: 2, maximumFractionDigits: 2 }
              )}`}
          </Sum>
        </HeaderBlock>

        <TransferBlock>
          <TransferWrap>
            <ButtonIcons
              src={receive}
              alt="receive"
              onClick={handleReceiveButtonClick}
            />
            <TransferTitle>Receive</TransferTitle>
          </TransferWrap>
          <TransferWrap>
            <ButtonIcons
              src={send}
              alt="send"
              onClick={handleSendButtonClick}
            />
            <TransferTitle>Send</TransferTitle>
          </TransferWrap>
        </TransferBlock>

        <Transactions>
          {state.currentUser &&
            state.currentUser.userData.transactions.map((item, i) => (
              <Link
                key={i}
                className={"transaction-nav"}
                to={`/transaction/${item.transactionId}`}
              >
                <Transaction key={item.transactionId} data={{ ...item }} />
              </Link>
            ))}
        </Transactions>
      </BalancePageStyle>
    </Wrapper>
  );
};

export default BalancePage;
