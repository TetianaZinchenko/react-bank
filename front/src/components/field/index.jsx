import { useState, useEffect, useCallback } from "react";

import show from "../../img/password-show.svg";
import hide from "../../img/password-hide.svg";

import "./index.css";

import {
  FieldLabel,
  FieldWrapper,
  FieldInput,
  FieldIcon,
  ErrorText,
} from "./index.styled";

const Field = ({ label, type, name, placeholder, onChange, formType }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isSumValid, setIsSumValid] = useState(false);

  const FIELD_ERROR = {
    IS_EMPTY: "Please fill in all the fields",
    EMAIL_SIGNUP: "Please enter a valid email address",
    PASSWORD_SIGNUP:
      "Sorry, the password is too simple. Password must be at least 8 characters long and include at least one digit, one lowercase and one uppercase letter",
    PASSWORD_SIGNIN: "Please enter your correct password",
    EMAIL_SIGNIN: "Invalid email address. Please check and try again",
    CODE: "Error. Code must be at least 6 digits",
    USER_EXIST: "User with this email already exists",
    SUM: "Error. The entered information must be a number, tens must be separated by a dot",
  };

  const validate = useCallback(
    (value) => {
      if (value.trim() === "") {
        return false;
      } else if (type === "sum") {
        return /^(?=.*\d)\d+(\.\d{1,2})?$/.test(value);
      } else if (type === "number") {
        return /^\d{6,}$/.test(value);
      } else if (type === "email") {
        const REG_EXP_EMAIL = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,}$/;
        return REG_EXP_EMAIL.test(value);
      } else if (type === "password") {
        const REG_EXP_PASSWORD =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        return REG_EXP_PASSWORD.test(value);
      } else return true;
    },
    [type]
  );

  const getError = useCallback(() => {
    if (!validate(inputValue)) {
      if (inputValue.trim() === "") {
        return FIELD_ERROR.IS_EMPTY;
      }
      if (formType === "signUp" && type === "password") {
        return FIELD_ERROR.PASSWORD_SIGNUP;
      } else if (formType === "signUp" && type === "email") {
        return FIELD_ERROR.EMAIL_SIGNUP;
      } else if (formType === "signIn" && type === "password") {
        return FIELD_ERROR.PASSWORD_SIGNIN;
      } else if (formType === "signIn" && type === "email") {
        return FIELD_ERROR.EMAIL_SIGNIN;
      } else if (type === "number") {
        return FIELD_ERROR.CODE;
      } else if (type === "sum") {
        return FIELD_ERROR.SUM;
      }
    }
    return undefined;
  }, [
    formType,
    inputValue,
    type,
    validate,
    FIELD_ERROR.IS_EMPTY,
    FIELD_ERROR.PASSWORD_SIGNUP,
    FIELD_ERROR.EMAIL_SIGNUP,
    FIELD_ERROR.PASSWORD_SIGNIN,
    FIELD_ERROR.EMAIL_SIGNIN,
    FIELD_ERROR.CODE,
    FIELD_ERROR.SUM,
  ]);

  const handleBlur = (error) => {
    const value = error.target.value;
    const inputValid = validate(value);

    setIsValid(inputValid);
    setIsFocus(false);
  };

  const handleFocus = () => {
    setIsFocus(true);
    setHasError(false);
  };

  const handleInputChange = (error) => {
    let value = error.target.value;

    if (value.trim() === "") {
      setInputValue(value);
      setIsValid(false);
      setHasError(true);
      if (type === "email") {
        setIsEmailValid(false);
      } else if (type === "sum") {
        setIsSumValid(false);
      }
      if (onChange) {
        onChange(value, false);
      }
    } else {
      let inputValid = validate(value);
      if (type === "number") {
        if (value.length >= 6) {
          value = value.slice(0, 6);
        }
      }
      setInputValue(value);
      setIsValid(inputValid);
      setHasError(!inputValid);
      if (type === "email") {
        setIsEmailValid(inputValid);
      } else if (type === "sum") {
        setIsSumValid(inputValid);
      }
      if (onChange) {
        onChange(value, inputValid);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (!isFocus) {
      const errorText = getError();
      setHasError(!errorText);
    }
  }, [getError, hasError, isFocus]);

  return (
    <div className={`field ${!isValid && !isFocus ? "invalid" : ""}`}>
      <FieldLabel htmlFor={name}>{label}</FieldLabel>
      <FieldWrapper>
        <FieldInput
          name={name}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          value={inputValue}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleInputChange}
          className="field__input"
        />
        {type === "password" && (
          <FieldIcon onClick={togglePasswordVisibility}>
            {showPassword ? (
              <img src={show} alt="show" />
            ) : (
              <img src={hide} alt="hide" />
            )}
          </FieldIcon>
        )}
        {!isValid && !isFocus && (
          <ErrorText style={{ top: hasError ? "calc(100% + 8px)" : "0" }}>
            {getError()}
          </ErrorText>
        )}
      </FieldWrapper>
    </div>
  );
};

export default Field;
