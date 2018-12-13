import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Input from "./Input";
import Label from "./Label";
import Form from "./Form";
import FormRow from "./FormRow";

let persistedState = { title: "", firstName: "", lastName: "", email: "" };

function CustomerDetails(props) {
  const { onChange, wizard } = props;
  const emailRef = React.createRef();
  let [state, setState] = useState(persistedState);
  let [isEmailValid, setIsEmailValid] = useState(true);

  useEffect(() => {
    persistedState = { ...state };
    wizard.reduce(ws => ({ ...ws, customer: state }));
  });

  function dispatchChangeIfCompleted() {
    const { title, firstName, lastName, email } = state;
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

  function handleEmailChange(e) {
    setIsEmailValid(e.target.checkValidity());
    updateState("email", e.target.value);
  }

  return (
    <Form>
      <FormRow>
        <Input
          type="text"
          id="title"
          name="title"
          autoComplete="off"
          className="small"
          onChange={handleTitleChange}
          value={state.title}
        />
        <Label>Title</Label>
      </FormRow>
      <FormRow>
        <Input
          type="text"
          id="title"
          name="title"
          autoComplete="off"
          onChange={handleFirstnameChange}
          value={state.firstName}
        />
        <Label>Firstname</Label>
      </FormRow>
      <FormRow>
        <Input
          type="text"
          id="lastname"
          name="lastName"
          autoComplete="off"
          onChange={handleLastnameChange}
          value={state.lastName}
        />
        <Label>Lastname</Label>
      </FormRow>
      <FormRow>
        <Input
          type="email"
          id="email"
          name="email"
          autoComplete="off"
          onChange={handleEmailChange}
          className={isEmailValid ? null : "error"}
          value={state.email}
        />
        <Label>Email</Label>
      </FormRow>
    </Form>
  );
}
export default CustomerDetails;
