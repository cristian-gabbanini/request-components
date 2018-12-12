import React from "react";

function Confirmation(props) {
  const { onChange, wizardState } = props;
  console.log(wizardState);
  return (
    <div>
      <h2>Here it is your request</h2>
      <pre>
        <code>{JSON.stringify(wizardState, null, 2)}</code>
      </pre>
    </div>
  );
}

export default Confirmation;
