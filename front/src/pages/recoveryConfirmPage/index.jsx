import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import authContext, { setUser } from "../../contexts/authContext";

import Wrapper from "../../components/wrapper";
import BackButton from "../../components/backButton";
import Heading from "../../components/heading";
import Field from "../../components/field";
import Button from "../../components/button";
import Alert from "../../components/alert";

import { Form } from "./index.styled";

const URL = "http://localhost:5000/api/auth/recovery-confirm";

function RecoveryConfirmPage() {
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleCodeChange = (value, isValid) => {
    setCode(value);
    setEmptyFields(false);
    setIsValid(isValid);
  };

  const handlePasswordChange = (value, isValid) => {
    setPassword(value);
    setEmptyFields(false);
    setPasswordError(!isValid);
  };

  const handleRecoveryConfirm = async () => {
    if (code.trim() === "" || password.trim() === "") {
      setEmptyFields(true);
      return;
    } else if (codeError || passwordError) {
      return;
    }

    try {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          password,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        dispatch(setUser(result.user));
        localStorage.setItem("token", result.token);
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
          title="Recover password"
          subtitle="Write the code you received"
        />

        <Form>
          <Field
            label="Code"
            type="number"
            name="code"
            placeholder="Enter your code"
            onChange={handleCodeChange}
          />
          <Field
            label="New password"
            type="password"
            name="password"
            formType="signUp"
            placeholder="Enter your new password"
            onChange={handlePasswordChange}
          />
          <Button
            onClick={handleRecoveryConfirm}
            text="Restore password"
            className="button--center button--primary"
            disabled={!isValid || passwordError || Boolean(!password)}
          />

          {emptyFields && <Alert text={"Please fill in all the fields"} />}
          {codeError && <Alert text={codeError} />}
        </Form>
      </React.Fragment>
    </Wrapper>
  );
}

export default RecoveryConfirmPage;
