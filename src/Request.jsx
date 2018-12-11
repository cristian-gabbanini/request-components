/** @jsx jsx */
import React, { useState } from "react";
import NumberInput from "./NumberInput";
import RoomRequest from "./RoomRequest";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";

const Separator = styled.hr`
  margin-top: 2em;
  border: 0px solid #ededed;
`;

const RoomTitle = styled.h2`
  margin: 1.5em 0 0.5em 0;
  color: #313131;
  overflow: hidden;
  &:first-of-type {
    &:after {
      position: relative;
      top: -0.55em;
      right: -4.5em;
      display: block;
      content: "";
      width: 80%;
      max-width: 25em;
      height: 2px;
      background-color: #ededed;
      z-index: -1;
    }
  }
`;

function Request(props) {
  const { maxChildren, minRooms, maxRooms } = props;
  const [rooms, setRooms] = useState(minRooms);
  function handleRoomsChange(rooms, direction) {
    setRooms(rooms);
  }
  return (
    <div css={{ padding: "1em" }}>
      <NumberInput
        min={minRooms}
        max={maxRooms}
        label={["Room", "Rooms"]}
        description={`Max ${maxRooms} rooms`}
        onChange={handleRoomsChange}
        div
      />
      {Array(rooms)
        .fill(1)
        .map((room, index) => (
          <div key={index}>
            <RoomTitle>Room {index + 1}</RoomTitle>
            <RoomRequest maxChildren={maxChildren} />
          </div>
        ))}
    </div>
  );
}

export default Request;
