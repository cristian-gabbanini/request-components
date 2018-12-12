import React, { useState } from "react";
import styled from "@emotion/styled";

const SelectorDiv = styled.div`
  user-select: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 1em 0;
  button {
    border: 2px solid;
    background-color: transparent;
    border-radius: 50%;
    width: 1.2em;
    height: 1.2em;
    cursor: pointer;
    margin: 0 0.3em;
    font-size: 2em;
    line-height: 1.1em;
    text-align: center;
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
    &:active {
      transform: scale(0.8);
    }
    &:focus {
      outline: 0;
    }
    &[disabled] {
      border-color: #ececec;
      color: #ececec;
    }
  }
  label {
    color: ${props => props.theme.colors.primary};
    display: inline-block;
    width: 8em;
    span {
      padding: 0.3em 0;
      display: block;
      font-size: 0.9em;
      color: ${props => props.theme.colors.primary};
    }
  }
  input {
    color: ${props => props.theme.colors.primary};
    background-color: transparent;
    font-size: 1.5em;
    max-width: 1.2em;
    border: 0;
    &:focus {
      outline: 0;
    }
  }
`;

function pluralize([singular, plural], value) {
  return value === 1 ? singular : plural;
}

function NumberInput(props) {
  const { min, max, label, description, onChange } = props;
  const [currentValue, setCurrentValue] = useState(min);
  const [singular, plural] = label;
  const [currentLabel, setCurrentLabel] = useState(pluralize(label, min));
  const [incrementEnabled, setIncrementEnabled] = useState(currentValue < max);
  const [decrementEnabled, setDecrementEnabled] = useState(currentValue > min);

  function updateButtonState(v) {
    setIncrementEnabled(v < max);
    setDecrementEnabled(v > min);
  }

  function handleClickIncrement() {
    if (currentValue < max) {
      let nextValue = currentValue + 1;
      setCurrentLabel(pluralize(label, nextValue));
      updateButtonState(nextValue);
      setCurrentValue(nextValue);
      if (typeof onChange === "function") {
        onChange(nextValue, "up");
      }
    }
  }

  function handleClickDecrement() {
    if (currentValue > min) {
      let nextValue = currentValue - 1;
      setCurrentLabel(pluralize(label, nextValue));
      updateButtonState(nextValue);
      setCurrentValue(nextValue);
      if (typeof onChange === "function") {
        onChange(nextValue, "down");
      }
    }
  }

  return (
    <SelectorDiv>
      <input type="text" value={currentValue} readOnly />
      <label>
        {currentLabel}
        {description && description.length > 0 ? (
          <span>{description}</span>
        ) : null}
      </label>
      <button onClick={handleClickIncrement} disabled={!incrementEnabled}>
        <i className="material-icons">add</i>
      </button>
      <button onClick={handleClickDecrement} disabled={!decrementEnabled}>
        <i className="material-icons">remove</i>
      </button>
    </SelectorDiv>
  );
}

export default NumberInput;
