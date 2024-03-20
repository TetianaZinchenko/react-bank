import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import authContext, { setUser } from "../../contexts/authContext";
import Wrapper from "../../components/wrapper";
import Field from "../../components/field";
import Button from "../../components/button";
import Header from "../../components/header";
import { ContentBlock } from "./index.styled";

const URL = "http://localhost:5000/api/auth/send";

const REG_EXP_EMAIL = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,}$/;
const REG_EXP_SUM = /^(?=.*\d)\d+(\.\d{1,2})?$/;

const SendPage = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [sum, setSum] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const validateEmail = (value) => {
    return REG_EXP_EMAIL.test(value);
  };

  const validateSum = (value) => {
    return REG_EXP_SUM.test(value);
  };

  const validateForm = (email, sum) => {
    return validateEmail(email) && validateSum(sum);
  };

  const handleChange = (value, type) => {
    if (type === "email") {
      setEmail(value);
    } else if (type === "sum") {
      setSum(value);
    }
    setIsFormValid(
      validateForm(
        type === "email" ? value : email,
        type === "sum" ? value : sum
      )
    );
  };

  const handleSendMoney = async () => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, sum }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message);
        throw new Error("Sending money failed");
      }
      dispatch(setUser(result.user));
      toast.success("Success");
      navigate("/balance");
    } catch (error) {
      console.error("Error sending money:", error);
    }
  };

  return (
    <Wrapper>
      <React.Fragment>
        <Header pageName="Send" />
        <ContentBlock>
          <Field
            label="Email"
            type="email"
            name="email"
            placeholder="example@gmail.com"
            onChange={(value) => handleChange(value, "email")}
            value={email}
          />
          <Field
            label="Sum"
            type="text"
            name="sum"
            placeholder="100$"
            onChange={(value) => handleChange(value, "sum")}
            value={sum}
          />
          <Button
            onClick={handleSendMoney}
            text="Send"
            className="button--center button--primary"
            disabled={!isFormValid}
          />
        </ContentBlock>
      </React.Fragment>
    </Wrapper>
  );
};

export default SendPage;
