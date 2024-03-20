import React from "react";

import BackButton from "../backButton";

import { PageName, PageTitle } from "./index.styled.jsx";

const Header = ({ pageName }) => {
  return (
    <PageName>
      <BackButton />
      <PageTitle>{pageName}</PageTitle>
    </PageName>
  );
};

export default Header;
