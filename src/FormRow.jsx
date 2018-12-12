import React from "react";
import styled from "@emotion/styled";

const FormRow = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin: 1.3em auto;

  [focused] + label {
    font-weight: bold;
  }
`;

export default FormRow;
