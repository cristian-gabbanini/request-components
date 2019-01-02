import React, { useState } from "react";
import styled from "@emotion/styled";
import State from "./State";

const WizardContainer = styled.div`
  position: relative;
  padding: 1em;
  max-width: 37.5em;
  margin: 0 auto;
`;

const WizardStep = styled.div``;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0.2em 0;
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

const sharedState = State();

function Wizard(props) {
  const { steps, children } = props;
  const totalSteps = steps.length;
  const [completedSteps, setCompletedSteps] = useState(
    Array(steps.length).fill(false)
  );
  const [step, setStep] = useState(0);
  const h1Ref = React.createRef();

  function handleNextClick() {
    const nextStep = step + 1;
    if (nextStep < totalSteps) {
      setStep(nextStep);
    }
  }

  function handlePrevClick() {
    const nextStep = step - 1;
    if (nextStep >= 0) {
      setStep(nextStep);
    }
  }

  function updateStepState(step, completed) {
    completedSteps[step] = completed;
    setCompletedSteps(completedSteps);
  }

  return (
    <WizardContainer>
      <Title>{steps[step]}</Title>

      {React.Children.map(children, (child, stepIndex) => {
        const clonedChild = React.cloneElement(child, {
          onChange: updateStepState.bind(null, stepIndex),
          wizard: sharedState
        });
        if (clonedChild.props.stepComplete) {
          completedSteps[stepIndex] = true;
        }
        return stepIndex === step ? (
          <WizardStep>{clonedChild}</WizardStep>
        ) : null;
      })}
      <Toolbar>
        <button onClick={handlePrevClick} disabled={!completedSteps[step - 1]}>
          <i className="material-icons">keyboard_arrow_left</i>
        </button>
        <button disabled={!completedSteps[step]} onClick={handleNextClick}>
          <i className="material-icons">keyboard_arrow_right</i>
        </button>
      </Toolbar>
    </WizardContainer>
  );
}

export default Wizard;
