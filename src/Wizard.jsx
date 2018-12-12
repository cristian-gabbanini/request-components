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
  const [completedSteps, setCompletedSteps] = useState(
    Array(steps.length).fill(false)
  );
  const [step, setStep] = useState(0);
  const [toolbarButtons, setToolbarButtons] = useState(
    completedSteps.map(r => ({
      next: false,
      prev: false
    }))
  );

  function updateButtonsStatus(step, completed) {
    toolbarButtons[step] = {
      prev: completedSteps[step - 1] || step > 0,
      next: completed || step + 1 < totalSteps - 1
    };
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

  function updateStepState(step, completed) {
    if (completed) {
      completedSteps[step] = completed;
      setCompletedSteps(completedSteps);
    }
    updateButtonsStatus(step, completed);
  }

  return (
    <WizardContainer>
      <Navbar>
        <h1>{steps[step]}</h1>
      </Navbar>
      {React.Children.map(children, (child, stepIndex) => {
        const clonedChild = React.cloneElement(child, {
          onChange: updateStepState.bind(null, stepIndex)
        });
        return stepIndex === step ? (
          <WizardStep>{clonedChild}</WizardStep>
        ) : null;
      })}
      <Toolbar>
        <button onClick={handlePrevClick} disabled={!toolbarButtons[step].prev}>
          <i className="material-icons">keyboard_arrow_left</i>
        </button>
        <button disabled={!toolbarButtons[step].next} onClick={handleNextClick}>
          <i className="material-icons">keyboard_arrow_right</i>
        </button>
      </Toolbar>
    </WizardContainer>
  );
}

export default Wizard;
