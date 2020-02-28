const React = require("react")
const {
  ApolloProvider,
  ApolloClient,
  HttpLink,
  InMemoryCache
} = require("@apollo/client")
const wrapRootElement = require("./wrap-root-element")

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://jamtodo.netlify.com/.netlify/functions/graphql"
  })
})
exports.wrapRootElement = ({ element }) => (
  <ApolloProvider client={apolloClient}>{wrapRootElement({ element })}</ApolloProvider>
)
