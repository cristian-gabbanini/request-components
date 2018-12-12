import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

const Form = styled.form`
  input {
    display: block;
    padding: 0.5em 1em;
    border: 1px solid #ededed;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.1em;
    margin-top: 0.25em;
    transition: border-color 300ms;
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      & + label {
        font-weight: bold;
      }
    }
    &.small {
      width: 5em;
    }
  }
  label {
    font-size: 1.1em;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin: 1.3em auto;
`;

let persistedState = { title: "", firstName: "", lastName: "" };

function CustomerDetails(props) {
  const { onChange } = props;
  let [state, setState] = useState(persistedState);

  useEffect(() => {
    persistedState = { ...state };
  });

  function dispatchChangeIfCompleted() {
    const { title, firstName, lastName } = state;
    if (title.length > 0 && firstName.length > 0 && lastName.length > 0) {
      onChange(true);
    } else {
      onChange(false);
    }
  }

  function updateState(property, value) {
    state = { ...state, [property]: value };
    setState(state);
    dispatchChangeIfCompleted();
  }

  function handleTitleChange(e) {
    updateState("title", e.target.value);
  }

  function handleFirstnameChange(e) {
    updateState("firstName", e.target.value);
  }

  function handleLastnameChange(e) {
    updateState("lastName", e.target.value);
  }

  return (
    <Form>
      <FormRow>
        <input
          type="text"
          id="title"
          name="title"
          autoComplete="off"
          className="small"
          onChange={handleTitleChange}
          value={state.title}
        />
        <label>Title</label>
      </FormRow>
      <FormRow>
        <input
          type="text"
          id="title"
          name="title"
          autoComplete="off"
          onChange={handleFirstnameChange}
          value={state.firstName}
        />
        <label>Firstname</label>
      </FormRow>
      <FormRow>
        <input
          type="text"
          id="title"
          name="title"
          autoComplete="off"
          onChange={handleLastnameChange}
          value={state.lastName}
        />
        <label>Lastname</label>
      </FormRow>
    </Form>
  );
}
export default CustomerDetails;
