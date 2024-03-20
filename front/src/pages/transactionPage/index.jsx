import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import authContext from "../../contexts/authContext";

import Wrapper from "../../components/wrapper";
import Header from "../../components/header";

import {
  NotificationsPage,
  ContentBlock,
  TransactionSum,
  TransactionRow,
  TransactionInformation,
} from "./index.styled";

const TransactionPage = (props) => {
  const params = useParams();
  console.log(params);

  const { state } = useContext(authContext);
  let transaction = state.currentUser.userData.transactions.find(
    (item) => +item.transactionId === +params.transactionId
  );

  let date = formatDate(transaction.time);

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.getMonth() + 1;
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${day} ${getMonthName(month)}, ${hours}:${minutes}`;
  }

  function getMonthName(monthIndex) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthIndex - 1];
  }

  return (
    <Wrapper>
      <NotificationsPage>
        <Header pageName="Transaction" />
        <ContentBlock>
          <TransactionSum>{transaction.sum}</TransactionSum>
          <TransactionInformation>
            <TransactionRow>
              <div>Date</div>
              <div>{date}</div>
            </TransactionRow>
            <hr className={"divider"} />
            <TransactionRow>
              <div>Address</div>
              <div>{transaction.email || transaction.paymentSystem}</div>
            </TransactionRow>
            <hr className={"divider"} />
            <TransactionRow>
              <div>Type</div>
              <div>{transaction.type}</div>
            </TransactionRow>
          </TransactionInformation>
        </ContentBlock>
      </NotificationsPage>
    </Wrapper>
  );
};

export default TransactionPage;
