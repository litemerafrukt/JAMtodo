import React from "react"
import { Container, Heading, Button, Flex } from "theme-ui"
import netlifyIdentity from "netlify-identity-widget"

export default props => {
  React.useEffect(() => {
    netlifyIdentity.init({})
  })

  return (
    <Container>
      <Flex sx={{ flexDirection: "column", padding: 3 }}>
        <Heading as="h1">JAMtodo</Heading>
        <Button sx={{ marginBottom: 2 }} onClick={() => netlifyIdentity.open()}>
          Log in
        </Button>
      </Flex>
    </Container>
  )
}
