import * as React from "react";
import { render } from "react-dom";
import "./styles.css";
import RoomRequest from "./RoomRequest";
import { ThemeProvider } from "emotion-theming";

const theme = {
  colors: {
    primary: "#395EC1"
  }
};

render(
  <ThemeProvider theme={theme}>
    <RoomRequest />
  </ThemeProvider>,
  document.getElementById("app")
);
