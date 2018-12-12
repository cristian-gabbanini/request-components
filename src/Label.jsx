import React from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-size: 1.1em;
  color: ${({ theme }) => theme.colors.primary};
  &.focused {
    font-weight: bold;
  }
`;

export default Label;
