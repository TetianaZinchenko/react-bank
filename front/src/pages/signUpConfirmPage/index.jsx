import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import authContext, { setUser } from "../../contexts/authContext";

import Wrapper from "../../components/wrapper";
import BackButton from "../../components/backButton";
import Heading from "../../components/heading";
import Field from "../../components/field";
import Button from "../../components/button";
import Alert from "../../components/alert";

import { Form } from "./index.styled";

const URL = "http://localhost:5000/api/auth/confirm";

function SignUpConfirmPage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(authContext);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [emptyFields, setEmptyFields] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (state.currentUser.isConfirmed) {
      navigate("/balance");
    }
    if (state.currentUser.confirmationCode) {
      console.log(
        `Your confirmation code is ${state.currentUser.confirmationCode}`
      );
      toast.success(
        `Your confirmation code is ${state.currentUser.confirmationCode}`
      );
    }
  }, []);

  const handleCodeChange = (value, isValid) => {
    setCode(value);
    setEmptyFields(false);
    setIsValid(isValid);
  };

  const errorAuthComponent = (
    <Link className="link" to={"/signup"}>
      Please sign up
    </Link>
  );

  const email = state.currentUser.email;
  const handleSignupConfirm = async () => {
    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          email,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        dispatch(setUser(result.user));
        localStorage.token = result.user.token;
        setEmptyFields(false);
        navigate("/balance");
      } else {
        setCodeError(result.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <React.Fragment>
        <BackButton />
        <Heading
          title="Confirm account"
          subtitle="Write the code you received"
        />

        <Form>
          <Field
            label={"Code"}
            type={"number"}
            name={"code"}
            placeholder={"Enter your code"}
            onChange={handleCodeChange}
          />
          <Button
            onClick={handleSignupConfirm}
            text="Confirm"
            className="button--center button--primary"
            disabled={!isValid}
          />

          {emptyFields && <Alert text={"Please fill in all the fields"} />}
          {codeError && <Alert text={codeError} />}
          {codeError.includes("You are not logged in") && (
            <div>{errorAuthComponent}</div>
          )}
        </Form>
      </React.Fragment>
    </Wrapper>
  );
}

export default SignUpConfirmPage;
