import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { toast } from "react-hot-toast";

import Wrapper from "../../components/wrapper";
import BackButton from "../../components/backButton";
import Heading from "../../components/heading";
import Field from "../../components/field";
import Button from "../../components/button";
import Alert from "../../components/alert";

import { Form } from "./index.styled";

const URL = "http://localhost:5000/api/auth/recovery";

function RecoveryPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleEmailChange = (value, isValid) => {
    setEmail(value);
    setEmptyFields(false);
    setEmailError(!isValid);
    setError(false);
    setErrorText("");
  };

  const errorAuthComponent = (
    <Link className="link" to={"/signup"}>
      Please sign up
    </Link>
  );

  const handleRecovery = async () => {
    if (email.trim() === "") {
      setEmptyFields(true);
      return;
    } else if (emailError) {
      return;
    }

    try {
      console.log(email);

      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        console.log(`Your recovery code is ${result.recoveryCode}`);
        toast.success(`Your recovery code is ${result.recoveryCode}`);

        setEmptyFields(false);
        setError(false);
        setErrorText("This email address does not exist");
        navigate("/recovery-confirm");
      } else {
        setError(true);
        setErrorText(result.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <React.Fragment>
        <BackButton />
        <Heading title="Recover password" subtitle="Choose a recovery method" />
        <Form>
          <Field
            label="Email"
            type="email"
            name="email"
            formType="signIn"
            placeholder="example@gmail.com"
            onChange={handleEmailChange}
          />
          <Button
            onClick={handleRecovery}
            text="Send code"
            className="button--center button--primary"
            disabled={emailError || Boolean(!email)}
          />

          {error && <Alert text={errorText} />}
          {errorText.includes("This email address does not exist") && (
            <div>{errorAuthComponent}</div>
          )}
          {emptyFields && <Alert text={"Please fill in all the fields"} />}
        </Form>
      </React.Fragment>
    </Wrapper>
  );
}

export default RecoveryPage;
