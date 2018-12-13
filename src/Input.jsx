import React from "react";
import styled from "@emotion/styled";

const Input = styled.input`  
    display: block;
    padding: 0.5em 1em;
    border: 1px solid #ededed;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.1em;
    margin-top: 0.25em;
    transition: border-color 300ms;
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      & + label {
        font-weight: bold;
      }
    }
    &.small {
      width: 5em;
    }
    &.error {
      color: ${({ theme }) => theme.colors.danger};
      border-color: ${({ theme }) => theme.colors.danger};
      & + label {
        color: ${({ theme }) => theme.colors.danger};
      }
    }
  }  
`;

export default Input;
