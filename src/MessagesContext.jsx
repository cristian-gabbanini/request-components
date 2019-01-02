import React from "react";
import it from "./messages/it";
import en from "./messages/en";

const messages = {
  it: it,
  en: en
};

const MessagesContext = React.createContext();

function MessagesProvider({ lang, children }) {
  return (
    <MessagesContext.Provider value={messages[lang]}>
      {children}
    </MessagesContext.Provider>
  );
}

export { MessagesProvider, MessagesContext };
