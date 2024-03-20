import React from "react";

import { HeadingBlock, Title, Subtitle } from "./index.styled.jsx";

const Heading = ({ title, subtitle }) => {
  return (
    <HeadingBlock>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </HeadingBlock>
  );
};

export default Heading;
