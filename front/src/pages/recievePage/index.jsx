import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import authContext, { setUser } from "../../contexts/authContext";

import BackButton from "../../components/backButton";
import Heading from "../../components/heading";
import Field from "../../components/field";
import Button from "../../components/button";
import Wrapper from "../../components/wrapper";

import "./index.css";

import {
  ContentBlock,
  SystemWrap,
  IconText,
  Icons,
  Icon,
} from "./index.styled";

const URL = "http://localhost:5000/api/auth/receive";

const REG_EXP_SUM = /^(?=.*\d)\d+(\.\d{1,2})?$/;

const RecievePage = () => {
  const navigate = useNavigate();

  const { dispatch } = useContext(authContext);

  const [sum, setSum] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const receiveStripe = async () => {
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sum,
          paymentSystem: "Stripe",
        }),
      });
      const result = await res.json();
      if (res.ok) {
        dispatch(setUser(result.user));
        toast.success("Received");
        navigate("/balance");
      }
      return res;
    } catch (error) {
      toast.error(error);
    }
  };

  const receiveCoinBase = async () => {
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sum,
          paymentSystem: "Coinbase",
        }),
      });
      const result = await res.json();
      if (res.ok) {
        dispatch(setUser(result.user));
        toast.success("Received");
        navigate("/balance");
      }
      return res;
    } catch (error) {
      toast.error(error);
    }
  };

  const validateSum = (value) => {
    return REG_EXP_SUM.test(value);
  };

  const validateForm = (sum) => {
    return validateSum(sum);
  };

  const handleSumChange = (value) => {
    setSum(value);
    setIsFormValid(validateForm(value));
  };

  return (
    <Wrapper>
      <React.Fragment>
        <BackButton />
        <Heading title="Receive" subtitle="Choose a receive method" />
        <ContentBlock>
          <Field
            label="Receive method"
            type="sum"
            name="sum"
            placeholder="100$"
            onChange={(value) => handleSumChange(value)}
            value={sum}
          />
          <Button
            onClick={() => receiveStripe()}
            className="button--secondary button-system"
            disabled={!isFormValid}
          >
            <SystemWrap>
              <span className="system__icon icon--stripe"></span>
              <IconText>Stripe</IconText>
            </SystemWrap>
            <Icons>
              <Icon className="icon--mastercard"></Icon>
              <Icon className="icon--tron-green"></Icon>
              <Icon className="icon--bitcoin"></Icon>
              <Icon className="icon--tron-red"></Icon>
              <Icon className="icon--ethereum"></Icon>
              <Icon className="icon--binance"></Icon>
            </Icons>
          </Button>
          <Button
            onClick={() => receiveCoinBase()}
            className="button--secondary button-system"
            disabled={!isFormValid}
          >
            <SystemWrap>
              <span className="system__icon icon--coinbase"></span>
              <IconText>Coinbase</IconText>
            </SystemWrap>
            <Icons>
              <Icon className="icon--tron-green" />
              <Icon className="icon--mastercard" />
              <Icon className="icon--tron-red" />
              <Icon className="icon--bitcoin" />
              <Icon className="icon--binance" />
              <Icon className="icon--ethereum" />
            </Icons>
          </Button>
        </ContentBlock>
      </React.Fragment>
    </Wrapper>
  );
};

export default RecievePage;
