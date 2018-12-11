import * as React from "react";
import { render } from "react-dom";
import "./styles.css";
import Request from "./Request";
import { ThemeProvider } from "emotion-theming";

const theme = {
  colors: {
    primary: "#395EC1"
  }
};

render(
  <ThemeProvider theme={theme}>
    <Request
      minRooms={1}
      maxRooms={5}
      minAdults={1}
      maxAdults={8}
      minChildren={0}
      maxChildren={3}
    />
  </ThemeProvider>,
  document.getElementById("app")
);
