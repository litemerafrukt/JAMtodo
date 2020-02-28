import React from "react"
import { Container, Flex, Button, Heading } from "theme-ui"
import { Router } from "@reach/router"
import { IdentityContext } from "../../identity-context"
import Dashboard from "../components/dashboard"

function DashNoUser(props) {
  const { identity: netlifyIdentity } = React.useContext(IdentityContext)

  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">JAMtodo</Heading>
        <Button sx={{ marginTop: 2 }} onClick={() => netlifyIdentity.open()}>
          Log in
        </Button>
      </Flex>
    </Container>
  )
}

export default props => {
  const { user } = React.useContext(IdentityContext)

  if (!user) {
    return (
      <Router>
        <DashNoUser path="/app" />
      </Router>
    )
  }

  return (
    <Router>
      <Dashboard path="/app" />
    </Router>
  )
}
