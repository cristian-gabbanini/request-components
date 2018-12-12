import React, { useState, useEffect } from "react";
import Input from "./Input";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

const placeholderColor = color => css`
  &::-webkit-input-placeholder {
    color: ${color};
  }
  &::-moz-placeholder {
    color: ${color};
  }
  &:-ms-input-placeholder {
    color: ${color};
  }
  &:-moz-placeholder {
    color: ${color};
  }
`;

const Day = styled(Input)`
  float: left;
  width: 4em;
  border-right: 0;
  transition: background-color 300ms, color 300ms;
  &:focus {
    border-color: #ededed;
    background-color: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
    ${placeholderColor("#ffffff")}
  }
  ${placeholderColor("#ededed")}
`;
const Month = styled(Day)`
  border-left: 0;
`;
const Year = styled(Day)`
  width: 6em;
  border-left: 0;
  border-right: 1px solid #efefef;
`;

function DateInput(props) {
  let { onRequestUpdate, day, month, year, name } = props;
  const [date, setDate] = useState({ day, month, year });

  const [focused, setFocused] = useState(false);

  function notifyParent() {
    if (typeof onRequestUpdate === "function") {
      onRequestUpdate(date);
    }
  }

  function selectText(e) {
    e.target.select();
    setFocused(true);
  }

  function handleDayChange(e) {
    const day = parseInt(e.target.value, 10);

    if (isNaN(day)) {
      return false;
    }

    if (isNaN(day) || day <= 0 || day > 31) {
      setDate(date);
    } else {
      setDate({ ...date, day });
    }
    notifyParent();
  }

  function handleMonthChange(e) {
    let month = parseInt(e.target.value, 10);
    if (isNaN(month)) {
      month = "";
    }
    setDate({ ...date, month: month.toString() });
    notifyParent();
  }

  function handleYearChange(e) {
    const year = parseInt(e.target.value, 10);
    if (isNaN(year) || year.toString().length > 4) {
      setDate(date);
    } else {
      setDate({ ...date, year });
    }
    notifyParent();
  }

  return (
    <div focused={focused ? "focused" : null}>
      <Day
        value={date.day}
        placeholder="DD"
        onFocus={selectText}
        onBlur={() => setFocused(false)}
        onChange={handleDayChange}
        name={`${name}[day]`}
      />
      <Month
        value={date.month}
        onFocus={selectText}
        onBlur={() => setFocused(false)}
        placeholder="MM"
        onChange={handleMonthChange}
        name={`${name}[month]`}
      />
      <Year
        value={date.year}
        onFocus={selectText}
        onBlur={() => setFocused(false)}
        placeholder="YYYY"
        onChange={handleYearChange}
        name={`${name}[year]`}
      />
    </div>
  );
}

export default DateInput;
