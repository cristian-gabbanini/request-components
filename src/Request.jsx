import React, { useState } from "react";
import NumberInput from "./NumberInput";
import RoomRequest from "./RoomRequest";
import styled from "@emotion/styled";

const Separator = styled.hr`
  border: 1px solid #ededed;
`;

const RoomTitle = styled.h2`
  margin: 0.5em 0;
  color: #313131;
`;

function Request(props) {
  const { minRooms, maxRooms } = props;
  const [rooms, setRooms] = useState(minRooms);
  function handleRoomsChange(rooms, direction) {
    setRooms(rooms);
  }
  return (
    <div>
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
          <div>
            {index > 0 ? <Separator /> : null}
            <RoomTitle>Room {index + 1}</RoomTitle>
            <RoomRequest />
          </div>
        ))}
    </div>
  );
}

export default Request;
