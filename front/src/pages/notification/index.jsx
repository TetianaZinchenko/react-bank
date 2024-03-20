import React from "react";

import bell from "../../img/bell.svg";
import warning from "../../img/warning.svg";

import {
  Card,
  NotificationIcon,
  CardContent,
  NotificationTitle,
  SubtitleBlock,
  NotificationSubtitle,
  Dot,
} from "./index.styled";

const Notification = ({ type, time }) => {
  let timeAgo = calculateTimeAgo(time);

  function calculateTimeAgo(timestamp) {
    const currentTime = new Date();
    const notificationTime = new Date(timestamp);
    const difference = currentTime.getTime() - notificationTime.getTime();
    const minutes = Math.floor(difference / 60000);

    if (minutes < 1) {
      return "just now";
    } else if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (minutes < 1440) {
      const hours = Math.floor(minutes / 60);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(minutes / 1440);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    }
  }

  return (
    <Card>
      {type === "Recovery" && <NotificationIcon src={warning} alt="alert" />}
      {type === "PasswordChange" && (
        <NotificationIcon src={warning} alt="alert" />
      )}
      {type === "EmailChange" && <NotificationIcon src={warning} alt="alert" />}
      {type === "Login" && <NotificationIcon src={bell} alt="bell" />}
      {type === "Recieve" && <NotificationIcon src={bell} alt="alert" />}
      {type === "Send" && <NotificationIcon src={bell} alt="alert" />}

      <CardContent>
        {type === "Recovery" && <NotificationTitle>Recovery</NotificationTitle>}
        {type === "Login" && <NotificationTitle>Login</NotificationTitle>}
        {type === "Send" && <NotificationTitle>Send money</NotificationTitle>}
        {type === "Recieve" && (
          <NotificationTitle>Reсeive money</NotificationTitle>
        )}
        {type === "PasswordChange" && (
          <NotificationTitle>Password changed</NotificationTitle>
        )}
        {type === "EmailChange" && (
          <NotificationTitle>Email changed</NotificationTitle>
        )}
        <SubtitleBlock>
          <NotificationSubtitle>{timeAgo}</NotificationSubtitle>
          <Dot></Dot>
          <NotificationSubtitle>Announcement</NotificationSubtitle>
        </SubtitleBlock>
      </CardContent>
    </Card>
  );
};

export default Notification;
