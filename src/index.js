import React, { useContext } from "react";
import { render } from "react-dom";
import "./styles.css";
import RequestApp from "./RequestApp";
import { MessagesProvider, MessagesContext } from "./MessagesContext";

import { ThemeProvider } from "emotion-theming";

const theme = {
  colors: {
    primary: "#395EC1",
    danger: "#DE6971"
  }
};

render(
  <ThemeProvider theme={theme}>
    <MessagesProvider lang="it">
      <RequestApp />
    </MessagesProvider>
  </ThemeProvider>,
  document.getElementById("app")
);
