import React from "react"
import { Container, Heading, Button, Flex } from "theme-ui"

export default props => (
  <Container>
    <Flex sx={{ flexDirection: "column", padding: 3 }}>
      <Heading as="h1">JAMtodo</Heading>
      <Button sx={{ marginBottom: 2 }} onClick={() => alert("Logging in!")}>
        Log in
      </Button>
    </Flex>
  </Container>
)
