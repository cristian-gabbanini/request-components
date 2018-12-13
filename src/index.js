import * as React from "react";
import { render } from "react-dom";
import "./styles.css";
import Request from "./Request";
import CustomerDetails from "./CustomerDetails";
import Wizard from "./Wizard";
import Confirmation from "./Confirmation";

import { ThemeProvider } from "emotion-theming";

const theme = {
  colors: {
    primary: "#395EC1",
    danger: "#DE6971"
  }
};

render(
  <ThemeProvider theme={theme}>
    <Wizard
      steps={[
        "1 - Fill in your details",
        "2 - Fill in your request",
        "3 - Confirmation"
      ]}
    >
      <CustomerDetails stepComplete={true} />
      <Request
        stepComplete={true}
        minRooms={1}
        maxRooms={5}
        minAdults={1}
        maxAdults={8}
        minChildren={0}
        maxChildren={5}
        minChildrenAge={1}
        maxChildrenAge={15}
      />
      <Confirmation />
    </Wizard>
  </ThemeProvider>,
  document.getElementById("app")
);
