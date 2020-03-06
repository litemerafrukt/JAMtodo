const React = require("react")
const {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache
} = require("@apollo/client")
const { setContext } = require("apollo-link-context")
const netlifyIdentity = require("netlify-identity-widget")

const wrapRootElement = require("./wrap-root-element")

const authLink = setContext((_, { headers }) => {
  const user = netlifyIdentity.currentUser()
  const token = user.token.access_token
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(
    new HttpLink({
      uri: "https://jamtodo.netlify.com/.netlify/functions/graphql"
    })
  )
})
exports.wrapRootElement = ({ element }) => (
  <ApolloProvider client={apolloClient}>{wrapRootElement({ element })}</ApolloProvider>
)
