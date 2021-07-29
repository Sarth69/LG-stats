import Container from "@material-ui/core/Container";
import React from "react";

import Header from "../components/Header/Header";

function General({ children }) {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <>{children}</>
      </Container>
    </>
  );
}

export default General;
