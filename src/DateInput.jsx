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

const date = new Date();
const currentYear = date.getFullYear();

function DateInput(props) {
  let { onChange, day, month, year, onFocus } = props;

  const [date, setDate] = useState({
    day: day,
    month: month,
    year: currentYear.toString()
  });

  function selectText(e) {
    e.target.select();
    if (typeof onFocus === "function") {
      onFocus(e);
    }
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
    onChange({ ...date, day });
  }

  function handleMonthChange(e) {
    let month = parseInt(e.target.value, 10);
    if (isNaN(month)) {
      month = "";
    }
    setDate({ ...date, month: month.toString() });
    onChange({ ...date, month: month.toString() });
  }

  function handleYearChange(e) {
    const year = parseInt(e.target.value, 10);
    if (isNaN(year) || year.toString().length > 4) {
      setDate(date);
    } else {
      setDate({ ...date, year });
    }
    onChange({ ...date, year });
  }

  return (
    <div>
      <Day
        value={day}
        placeholder="DD"
        onFocus={selectText}
        onChange={handleDayChange}
      />
      <Month
        value={month}
        onFocus={selectText}
        placeholder="MM"
        onChange={handleMonthChange}
      />
      <Year
        value={year}
        onFocus={selectText}
        placeholder="YYYY"
        onChange={handleYearChange}
      />
    </div>
  );
}

export default DateInput;
