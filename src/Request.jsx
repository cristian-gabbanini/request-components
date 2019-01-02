/** @jsx jsx */
import React, { useState, useEffect, useContext } from "react";
import NumberInput from "./NumberInput";
import RoomRequest from "./RoomRequest";
import Form from "./Form";
import FormRow from "./FormRow";
import DateInput from "./DateInput";
import Label from "./Label";
import styled from "@emotion/styled";
import { jsx } from "@emotion/core";
import { MessagesContext } from "./MessagesContext";

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

function dateObject() {
  return { day: "", month: "", year: "" };
}

function Request(props) {
  const messages = useContext(MessagesContext);
  console.log(messages);
  const {
    maxChildren,
    minRooms,
    maxRooms,
    minChildrenAge,
    maxChildrenAge,
    onChange,
    wizard
  } = props;
  let roomRequests = [];
  const [rooms, setRooms] = useState(() => {
    const { request } = wizard.get();
    if (request) {
      const { rooms } = request;
      return rooms;
    }
    return minRooms;
  });
  const [arrival, setArrival] = useState(() => {
    const { request } = wizard.get();
    if (request) {
      const { arrival } = request;
      return arrival;
    }
    return dateObject();
  });
  const [departure, setDeparture] = useState(() => {
    const { request } = wizard.get();
    if (request) {
      const { departure } = request;
      return departure;
    }
    return dateObject();
  });
  const arrivalLabel = React.createRef();

  function handleRoomsChange(rooms, direction) {
    setRooms(rooms);
  }

  useEffect(
    () => {
      updateWizardState({ arrival, departure, rooms, roomRequests });
    },
    [arrival, departure, rooms, roomRequests]
  );

  function updateWizardState({ arrival, departure, rooms, roomRequests }) {
    wizard.reduce(ws => ({
      ...ws,
      request: {
        arrival,
        departure,
        rooms,
        roomRequests
      }
    }));
  }

  function updateRooms(index, roomRequest) {
    roomRequests[index] = roomRequest;
  }

  function updateDeparture(date) {
    setArrival(date);
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
            day={arrival.day}
            month={arrival.month}
            year={arrival.year}
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
          value={rooms}
          label={[messages.room, messages.rooms]}
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
