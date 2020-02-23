const { ApolloServer, gql } = require("apollo-server-lambda")

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    todos: [Todo]!
  }
  type Todo {
    id: ID!
    done: Boolean!
    description: String!
  }
  type Mutation {
    addTodo(description: String!): Todo
    toggleDone(id: !ID): Todo
  }
`

const todos = {}
let todoIndex = 0
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    todos: () => Object.values(todos)
  },
  Mutation: {
    addTodo(_, { description }) {
      todoIndex++
      const id = `key-${todoIndex}`
      todos[id] = { id, description, done: false }

      return todos[id]
    },
    toggleDone(_, { id }) {
      todos[id].done = !todos[id].done

      return todos[id]
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,

  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true
})

exports.handler = server.createHandler()
