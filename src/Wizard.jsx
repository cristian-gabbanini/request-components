import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import State from "./State";

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
  width: 100%;
  height: 3em;
  line-height: 2em;
  padding: 0.5em;
  background-color: ${({ theme }) => theme.colors.primary};
  h1 {
    color: #ffffff;
    margin: 0;
    opacity: 0;
    &.slideIn {
      animation: slideIn 300ms;
      animation-fill-mode: forwards;
    }
    &.visible {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(-200%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
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

const sharedState = State();

function Wizard(props) {
  const { steps, children } = props;
  const totalSteps = steps.length;
  const [completedSteps, setCompletedSteps] = useState(
    Array(steps.length).fill(false)
  );
  const [step, setStep] = useState(0);
  const h1Ref = React.createRef();

  useEffect(
    () => {
      setTimeout(() => {
        h1Ref.current.classList.remove("slideIn");
        h1Ref.current.classList.add("visible");
      }, 600);
    },
    [step]
  );

  function handleNextClick() {
    console.log("www");
    h1Ref.current.classList.add("slideIn");
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
      <Navbar>
        <h1 ref={h1Ref}>{steps[step]}</h1>
      </Navbar>
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
