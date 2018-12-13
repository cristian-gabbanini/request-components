/** @jsx jsx */
import React, { useState, useEffect } from "react";
import NumberInput from "./NumberInput";
import RoomRequest from "./RoomRequest";
import Form from "./Form";
import FormRow from "./FormRow";
import DateInput from "./DateInput";
import Label from "./Label";
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
  const {
    maxChildren,
    minRooms,
    maxRooms,
    minChildrenAge,
    maxChildrenAge,
    wizard
  } = props;
  let roomRequests = [];
  const [rooms, setRooms] = useState(minRooms);
  const [departure, setDeparture] = useState({ day: "", month: "", year: "" });
  const arrivalLabel = React.createRef();
  function handleRoomsChange(rooms, direction) {
    setRooms(rooms);
  }

  useEffect(() => {
    updateWizardState({ departure, rooms });
  });

  function updateWizardState({ departure, roomRequests }) {
    wizard.reduce(ws => ({
      ...ws,
      request: {
        departure: `${departure.year}-${departure.month}-${departure.day}`,
        rooms: roomRequests
      }
    }));
  }

  function updateRooms(index, roomRequest) {
    roomRequests[index] = roomRequest;
    updateWizardState({ departure, roomRequests });
  }

  function updateDeparture(date) {
    setDeparture({
      ...departure,
      day: parseInt(date.day, 10) + 2,
      month: date.month,
      year: date.year
    });
  }

  return (
    <div>
      <Form>
        <FormRow>
          <DateInput
            type="text"
            name="arrival"
            onChange={updateDeparture}
            onFocus={() => arrivalLabel.current.focus()}
          />
          <Label ref={arrivalLabel}>Arrival</Label>
        </FormRow>
        <FormRow>
          <DateInput
            type="text"
            name="departure"
            day={departure.day}
            month={departure.month}
            year={departure.year}
          />
          <Label>Departure</Label>
        </FormRow>
      </Form>
      <FormRow>
        <NumberInput
          min={minRooms}
          max={maxRooms}
          label={["Room", "Rooms"]}
          description={`Max ${maxRooms} rooms`}
          onChange={handleRoomsChange}
          div
        />
      </FormRow>
      {Array(rooms)
        .fill(1)
        .map((room, index) => (
          <div key={index}>
            <RoomTitle>Room {index + 1}</RoomTitle>
            <RoomRequest
              maxChildren={maxChildren}
              onChange={updateRooms.bind(this, index)}
            />
          </div>
        ))}
    </div>
  );
}

export default Request;
