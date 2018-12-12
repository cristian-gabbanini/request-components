import * as React from "react";
import { render } from "react-dom";
import "./styles.css";
import Request from "./Request";
import Wizard from "./Wizard";
import { ThemeProvider } from "emotion-theming";

const theme = {
  colors: {
    primary: "#395EC1"
  }
};

render(
  <ThemeProvider theme={theme}>
    <Wizard steps={["1 - Fill in your details", "2 - Fill in your request"]}>
      <div>
        <h2>This should be a child</h2>
      </div>
      <Request
        minRooms={1}
        maxRooms={5}
        minAdults={1}
        maxAdults={8}
        minChildren={0}
        maxChildren={5}
      />
    </Wizard>
  </ThemeProvider>,
  document.getElementById("app")
);
