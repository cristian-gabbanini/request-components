import React, { useContext } from "react";
import Container from "./Container";
import Wizard from "./Wizard";
import Confirmation from "./Confirmation";
import Request from "./Request";
import { MessagesContext } from "./MessagesContext";

function RequestApp() {
  const messages = useContext(MessagesContext);
  return (
    <Container>
      <Wizard steps={[messages.quotation_request, messages.confirmation]}>
        <Request
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
    </Container>
  );
}

export default RequestApp;
