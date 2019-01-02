import React, { useContext } from "react";
import { MessagesContext } from "./MessagesContext";
import styled from "@emotion/styled";

const DatepickerContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  min-height: 3em;
  padding: 1em;

  .arrow {
    text-align: center;
    span {
      font-size: 3.5em;
      color: ${({ theme }) => theme.colors.primary};
      text-shadow: 1px 1px ${({ theme }) => theme.colors.border};
    }
  }

  @media only screen and (min-width: 400px) {
    padding: 0.5em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const DatepickerDate = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-center;
  color: ${({ theme }) => theme.colors.text};
  h2 {
    margin: 0;
  }
  h2:first-of-type {
    flex: 0 0 20%;
    max-width: 2em;
  }
  h2:last-of-type {
    flex: 0 0 80%;
  }
  p {
    position: relative;
    margin: 0;
    left: 20%;

    align-self: flex-start;
    font-size: 0.9em;
  }
`;

function DateDisplay({ day, month, year }) {
  const { months, daysOfTheWeek } = useContext(MessagesContext);
  const date = new Date(year, month - 1, day);
  return (
    <DatepickerDate>
      <h2>{day}</h2>
      <h2>
        {months[month - 1]} {year}
      </h2>
      <p>{daysOfTheWeek[date.getDay()]}</p>
    </DatepickerDate>
  );
}

function Arrow() {
  return (
    <div className="arrow">
      <span className="material-icons">arrow_right_alt</span>
    </div>
  );
}

function Datepicker() {
  return (
    <DatepickerContainer>
      <DateDisplay day={12} month={1} year={2019} />
      <Arrow />
      <DateDisplay day={14} month={1} year={2019} />
    </DatepickerContainer>
  );
}

export default Datepicker;
