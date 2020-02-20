import React from "react"
import { Container, Flex, Button, Heading, NavLink } from "theme-ui"
import { Router, Link } from "@reach/router"
import { IdentityContext } from "../../identity-context"

function Dash(props) {
  const { user, identity: netlifyIdentity } = React.useContext(IdentityContext)
  return (
    <Container>
      <Flex as="nav">
        <NavLink as={Link} to="/" p={2}>
          Home
        </NavLink>
        <NavLink as={Link} to={"/app"} p={2}>
          Dashboard
        </NavLink>
        {user && (
          <NavLink
            href="#!"
            p={2}
            onClick={() => {
              netlifyIdentity.logout()
            }}
          >
            Log out {user.user_metadata.full_name}
          </NavLink>
        )}
      </Flex>
      <span>Dash {user?.user_metadata.full_name}</span>
    </Container>
  )
}

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
      <Dash path="/app" />
    </Router>
  )
}
