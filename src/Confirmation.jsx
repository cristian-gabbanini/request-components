import React from "react";

function Confirmation({ wizard }) {
  return (
    <div>
      <h2>Here it is your request</h2>
      <pre>
        <code>{JSON.stringify(wizard.get(), null, 2)}</code>
      </pre>
    </div>
  );
}

export default Confirmation;
