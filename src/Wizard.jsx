import React, { useState } from "react";
import styled from "@emotion/styled";

const WizardContainer = styled.div`
  position: relative;
  padding-top: 3em;
`;

const WizardStep = styled.div`
  padding: 1em;
  max-width: 37.5em;
  margin: 0 auto;
`;

const Navbar = styled.nav`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 3em;
  line-height: 2em;
  padding: 0.5em;
  background-color: ${({ theme }) => theme.colors.primary};
  h1 {
    color: #ffffff;
    margin: 0;
  }
`;

const Toolbar = styled.div`
  margin: 2em auto;
  text-align: center;
  button {
    background-color: transparent;
    padding: 0.5em 2em;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    &[disabled] {
      color: #ededed;
      border-color: #ededed;
    }
  }
`;

function Wizard(props) {
  const { steps, children } = props;
  const totalSteps = steps.length;
  const [step, setStep] = useState(0);
  const [toolbarButtons, setToolbarButtons] = useState({
    nextEnabled: true,
    prevEnabled: false
  });
  let states = [, ,];

  function updateButtonsStatus(nextStep) {
    setToolbarButtons({
      nextEnabled: false,
      prevEnabled: nextStep > 0
    });
  }

  function handleNextClick() {
    const nextStep = step + 1;
    if (nextStep < totalSteps) {
      setStep(nextStep);
    }
    updateButtonsStatus(nextStep);
  }

  function handlePrevClick() {
    const nextStep = step - 1;
    if (nextStep >= 0) {
      setStep(nextStep);
    }
    updateButtonsStatus(nextStep);
  }

  function updateStepState(completed) {
    setToolbarButtons({ ...toolbarButtons, nextEnabled: completed });
  }
  function storeState(index, state) {
    states[index] = state;
    console.log(states);
  }

  return (
    <WizardContainer>
      <Navbar>
        <h1>{steps[step]}</h1>
      </Navbar>
      {React.Children.map(children, (child, index) => {
        const clonedChild = React.cloneElement(child, {
          onChange: updateStepState,
          persistState: storeState.bind(index),
          initialState: states[index] ? states[index] : undefined
        });
        return index === step ? <WizardStep>{clonedChild}</WizardStep> : null;
      })}
      <Toolbar>
        <button
          onClick={handlePrevClick}
          disabled={!toolbarButtons.prevEnabled}
        >
          <i className="material-icons">keyboard_arrow_left</i>
        </button>
        <button
          disabled={!toolbarButtons.nextEnabled}
          onClick={handleNextClick}
        >
          <i className="material-icons">keyboard_arrow_right</i>
        </button>
      </Toolbar>
    </WizardContainer>
  );
}

export default Wizard;
