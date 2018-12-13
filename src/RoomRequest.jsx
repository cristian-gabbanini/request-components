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
  const { maxChildren, onChange } = props;
  const [childrenAges, setChildrenAges] = useState([]);
  const [numChildren, setNumChildren] = useState(0);
  const [adults, setAdults] = useState(1);

  function notifyParent() {
    if (typeof onChange === "function") {
      onChange({
        adults,
        children: numChildren,
        childrenAges
      });
    }
  }

  useEffect(
    () => {
      notifyParent();
    },
    [adults, childrenAges, numChildren]
  );

  function handleAdultsChange(num, direction) {
    setAdults(num, notifyParent);
  }

  function handleChildrenChange(num, direction) {
    if (direction === "up") {
      childrenAges.push(1);
      setChildrenAges(setChildrenAges, notifyParent);
    } else {
      childrenAges.pop();
      setChildrenAges(childrenAges, notifyParent);
    }
    setNumChildren(num, notifyParent);
  }

  function handleChildrenAgeChange(child, age) {
    childrenAges[child] = age;
    setChildrenAges(childrenAges);
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
        {Array(numChildren)
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
