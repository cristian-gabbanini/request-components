import React, { useState } from "react";
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

function CustomerDetails(props) {
  const { onChange, initialState, persistState } = props;
  const [state, setState] = useState(
    initialState || {
      title: "",
      firstName: "",
      lastName: ""
    }
  );

  function dispatchChangeIfCompleted() {
    const { title, firstName, lastName } = state;
    if (title.length > 0 && firstName.length > 0 && lastName.length > 0) {
      onChange(true);
      persistState(state);
    } else {
      onChange(false);
    }
  }

  function handleTitleChange(e) {
    setState({ ...state, title: e.target.value });
    dispatchChangeIfCompleted();
  }

  function handleFirstnameChange(e) {
    setState({ ...state, firstName: e.target.value });
    dispatchChangeIfCompleted();
  }

  function handleLastnameChange(e) {
    setState({ ...state, lastName: e.target.value });
    dispatchChangeIfCompleted();
  }

  return (
    <Form>
      <FormRow>
        <input
          type="text"
          id="title"
          name="title"
          autocomplete="off"
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
          autocomplete="off"
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
          autocomplete="off"
          onChange={handleLastnameChange}
          value={state.lastName}
        />
        <label>Lastname</label>
      </FormRow>
    </Form>
  );
}
export default CustomerDetails;
