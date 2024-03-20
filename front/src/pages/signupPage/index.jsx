import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import authContext, { setUser } from "../../contexts/authContext";

import Wrapper from "../../components/wrapper";
import BackButton from "../../components/backButton";
import Heading from "../../components/heading";
import Field from "../../components/field";
import Button from "../../components/button";
import Alert from "../../components/alert";

import "./index.css";

import { Form, LinkPrefix } from "./index.styled";

const URL = "http://localhost:5000/api/auth/signup";

const SignupPage = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [userExistText, setUserExistText] = useState("");

  const handleEmailChange = (value, isValid) => {
    setEmail(value);
    setEmailError(!isValid);
    setEmptyFields(false);
    setUserExist(false);
    setUserExistText("");
  };

  const handlePasswordChange = (value, isValid) => {
    setPassword(value);
    setPasswordError(!isValid);
    setEmptyFields(false);
    setUserExist(false);
    setUserExistText("");
  };

  const handleSignup = async () => {
    if (email.trim() === "" || password.trim() === "") {
      setEmptyFields(true);
      return;
    } else if (emailError || passwordError) {
      return;
    }

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.token = result.user.token;
        dispatch(setUser(result.user));
        setEmptyFields(false);
        setUserExist(false);
        setUserExistText("");
        navigate("/signup-confirm");
      } else {
        setUserExist(true);
        setUserExistText(result.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <React.Fragment>
        <BackButton />
        <Heading title="Sign Up" subtitle="Choose a registration method" />

        <Form>
          <Field
            label={"Email"}
            type={"email"}
            name={"email"}
            placeholder={"example@gmail.com"}
            formType="signUp"
            onChange={handleEmailChange}
          />

          <Field
            label={"Password"}
            type={"password"}
            name={"password"}
            placeholder={"Pass2000ID"}
            formType="signUp"
            onChange={handlePasswordChange}
          />

          <LinkPrefix>
            Already have an account?{" "}
            <Link to={"/signin"} className="link">
              Sign In
            </Link>
          </LinkPrefix>

          <Button
            onClick={handleSignup}
            text="Continue"
            className="button--center button--primary"
            disabled={
              emailError ||
              passwordError ||
              Boolean(!password) ||
              Boolean(!email)
            }
          />

          {userExist && <Alert text={userExistText} />}
          {emptyFields && <Alert text={"Please fill in this fields"} />}
        </Form>
      </React.Fragment>
    </Wrapper>
  );
};

export default SignupPage;
