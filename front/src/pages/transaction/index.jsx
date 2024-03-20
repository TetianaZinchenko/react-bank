import React from "react";

import sending from "../../img/sending.svg";
import stripe from "../../img/stripe.svg";
import coinbase from "../../img/coinbase.svg";

import {
  CardNotification,
  TransactionInfo,
  TransactionIcon,
  TransactionContent,
  TransactionName,
  SubtitleBlock,
  TransactionSubtitle,
  Dot,
  TransactionType,
} from "./index.styled";

const Transaction = ({ data }) => {
  let time = formatDate(data.time);

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <CardNotification>
      <TransactionInfo>
        {data.paymentSystem === "Stripe" && (
          <TransactionIcon src={stripe} alt="sending" />
        )}
        {data.paymentSystem === "Coinbase" && (
          <TransactionIcon src={coinbase} alt="sending" />
        )}
        {data.email && <TransactionIcon src={sending} alt="sending" />}

        <TransactionContent>
          {data.paymentSystem && (
            <TransactionName>{data.paymentSystem}</TransactionName>
          )}
          {data.email && <TransactionName>{data.email}</TransactionName>}
          <SubtitleBlock>
            <TransactionSubtitle>{time}</TransactionSubtitle>
            <Dot></Dot>
            {data.type === "Recieve" && (
              <TransactionType>Receipt</TransactionType>
            )}
            {data.type === "Receive" && (
              <TransactionType>Receipt</TransactionType>
            )}
            {data.type === "Send" && <TransactionType>Sending</TransactionType>}
          </SubtitleBlock>
        </TransactionContent>
      </TransactionInfo>
      {data.type !== "Send" && (
        <div className={"transaction-amount-green"}>{data.sum}</div>
      )}
      {data.type === "Send" && (
        <div className={"transaction-amount"}>{data.sum}</div>
      )}
    </CardNotification>
  );
};

export default Transaction;
