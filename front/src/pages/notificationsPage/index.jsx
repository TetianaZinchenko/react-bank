import React, { useContext } from "react";

import authContext from "../../contexts/authContext";

import Notification from "../notification";

import Header from "../../components/header";
import Wrapper from "../../components/wrapper";

import { NotificationsPageStyle, ContentBlock } from "./index.styled";

const NotificationsPage = () => {
  const { state } = useContext(authContext);
  return (
    <Wrapper>
      <NotificationsPageStyle>
        <Header pageName="Notifications" />
        <ContentBlock>
          {state.currentUser &&
            state.currentUser.userData.notifications.map((item, i) => (
              <Notification
                key={i}
                time={item.time}
                type={item.type}
              ></Notification>
            ))}
        </ContentBlock>
      </NotificationsPageStyle>
    </Wrapper>
  );
};

export default NotificationsPage;
