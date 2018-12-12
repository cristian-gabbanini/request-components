import React, { useState, useEffect } from "react";
import Input from "./Input";
import styled from "@emotion/styled";

const Day = styled(Input)`
  float: left;
  width: 4em;
  border-right: 0;
  transition: background-color 300ms, color 300ms;
  &:focus {
    border-color: #ededed;
    background-color: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
  }
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
  const { onChange, day, month, year } = props;
  const [date, setDate] = useState({
    day: "DD",
    month: "MM",
    year: currentYear.toString()
  });

  function selectText(e) {
    e.target.select();
  }

  function handleDayChange(e) {
    const day = parseInt(e.target.value, 10);
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
        value="DD"
        onFocus={selectText}
        value={date.day}
        onChange={handleDayChange}
      />
      <Month value="MM" value={date.month} onChange={handleMonthChange} />
      <Year value="YYYY" value={date.year} onChange={handleYearChange} />
    </div>
  );
}

export default DateInput;
