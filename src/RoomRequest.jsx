import React, { useState, useEffect } from "react";
import NumberInput from "./NumberInput";
import AgeSelector from "./AgeSelector";
import styled from "@emotion/styled";

const Row = styled.div`
  @media only screen and (max-width: 337px) {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  div {
    margin: 0 1.4em;
    @media only screen and (max-width: 337px) {
      margin: 1em 0;
    }
    &:first-of-type {
      margin-left: 0;
    }
    &:last-of-type {
      margin-right: 0;
    }
  }
`;

function Request(props) {
  const { minAdults, maxAdults, maxChildren, onUpdate } = props;
  const [state, setState] = useState({
    adults: minAdults,
    children: 0,
    childrenAges: []
  });

  function notifyParent(state) {
    if (typeof onUpdate === "function") {
      onUpdate(state);
    }
  }

  function handleAdultsChange(num, direction) {
    const newState = { ...state, adults: num };
    setState(newState);
    notifyParent(newState);
  }

  function handleChildrenChange(num, direction) {
    const ages = state.childrenAges;
    if (direction === "up") {
      ages.push(1);
    } else {
      ages.pop();
    }
    const newState = { ...state, children: num, childrenAges: ages };
    setState(newState);
    notifyParent(newState);
  }

  function handleChildrenAgeChange(child, age) {
    const ages = state.childrenAges;
    ages[child] = age;
    const newState = { ...state, childrenAges: ages };
    notifyParent(newState);
  }

  return (
    <div>
      <NumberInput
        min={1}
        max={5}
        label={["Adult", "Adults"]}
        description={"Over 16 years old"}
        onChange={handleAdultsChange}
      />
      <NumberInput
        min={0}
        max={maxChildren}
        label={["Child", "Children"]}
        description={"Under 16 years old"}
        onChange={handleChildrenChange}
      />
      <Row>
        {Array(state.children)
          .fill(1)
          .map((_, child) => (
            <AgeSelector
              key={child}
              min={1}
              max={16}
              onChange={handleChildrenAgeChange.bind(null, child)}
            />
          ))}
      </Row>
    </div>
  );
}

export default Request;
