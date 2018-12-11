import React, { useState } from "react";
import styled from "@emotion/styled";

const AgeSelect = styled.div`
  position: relative;
  display: inline-block;
  select {
    padding: 0.8em;
    border: 1px solid #ededed;
    border-radius: 0.3em;
    appearance: none;
    width: 5em;
    color: #313131;
    &:focus {
      outline: 0;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
  i {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 1.3em;
    border-left: 1px solid #ededed;
    z-index: 100;
    color: ${({ theme }) => theme.colors.primary};
    pointer-events: none;
  }

  select {
    &:focus + i {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

function AgeSelector(props) {
  const { max, min, onChange } = props;
  function onAgeChange(e) {
    if (typeof onChange === "function") {
      onChange(parseInt(e.target.value, 10));
    }
  }
  return (
    <AgeSelect>
      <select onChange={onAgeChange}>
        {Array(max)
          .fill(min)
          .map((baseAge, index) => (
            <option key={index} value={min + index}>
              {min + index}
            </option>
          ))}
      </select>
      <i className="material-icons">keyboard_arrow_down</i>
    </AgeSelect>
  );
}

export default AgeSelector;
