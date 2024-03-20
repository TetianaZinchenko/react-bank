import React, { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import authContext, { exit, setUser } from "../../contexts/authContext";

import Wrapper from "../../components/wrapper";
import Header from "../../components/header";
import Field from "../../components/field";
import Button from "../../components/button";

import { ChangeBlock, SettingsTitle, Divider } from "./index.styled";

const SettingsPage = () => {
  const { dispatch } = useContext(authContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangeEmail = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/changeEmail",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password: oldPassword }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to change email");
      }

      const result = await response.json();

      dispatch(setUser(result.user));
      toast.success("Email changed successfully");
    } catch (error) {
      console.error("Error changing email:", error);
      toast.error("Failed to change email");
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/changePassword",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ oldPassword, newPassword }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to change password");
      }

      const result = await response.json();

      dispatch(setUser(result.user));
      toast.success("Password changed successfully");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password");
    }
  };

  const handlePasswordButtonClick = () => {
    handleChangePassword(newPassword);
  };

  const handleLogout = () => {
    dispatch(exit());

    navigate("/");
  };

  return (
    <Wrapper>
      <React.Fragment>
        <Header pageName="Settings" />
        <ChangeBlock>
          <SettingsTitle>Change email</SettingsTitle>
          <Field
            label="Email"
            type="email"
            name="email"
            placeholder="example@gmail.com"
            onChange={setEmail}
          />
          <Field
            label="Old Password"
            type="password"
            name="password"
            placeholder="Enter your old password"
            onChange={setOldPassword}
          />
          <Button
            text="Save Email"
            className="button--center button--secondary"
            onClick={() => handleChangeEmail()}
          />
          <Divider />
          <SettingsTitle>Change password</SettingsTitle>
          <Field
            label="Old Password"
            type="password"
            name="password"
            placeholder="Enter your old password"
            onChange={setOldPassword}
          />
          <Field
            label="New Password"
            type="password"
            name="password"
            placeholder="Enter your new password"
            onChange={setNewPassword}
          />
          <Button
            text="Save Password"
            className="button--center button--secondary"
            onClick={handlePasswordButtonClick}
          />
          <Divider />
          <Button
            text="Log Out"
            className="button--center button--danger"
            onClick={handleLogout}
          />
        </ChangeBlock>
      </React.Fragment>
    </Wrapper>
  );
};

export default SettingsPage;
