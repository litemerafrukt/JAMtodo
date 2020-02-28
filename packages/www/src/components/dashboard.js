import React from "react"
import { Container, Flex, Button, Input, Label, NavLink, Checkbox } from "theme-ui"
import { Link } from "@reach/router"
import { gql, useMutation, useQuery } from "@apollo/client"
import { Machine, assign } from "xstate"
import { useMachine } from "@xstate/react"
import uid from "uniqid"
import produce from "immer"
import { IdentityContext } from "../../identity-context"

const update = updaterFn => assign(produce(updaterFn))

const TodosMachine = Machine({
  id: "todos",
  context: { todos: [] },
  initial: "running",
  states: {
    running: {}
  },
  on: {
    ADD: {
      actions: update((context, { description }) => {
        context.todos.push({ id: uid(), done: false, description })
      })
    },
    TOGGLE: {
      actions: update((context, { id }) => {
        const todoIndex = context.todos.findIndex(todo => todo.id === id)

        if (todoIndex > -1) context.todos[todoIndex].done = !context.todos[todoIndex].done
      })
    }
  }
})

const ADD_TODO = gql`
  mutation AddTodo($description: String!) {
    addTodo(description: $description) {
      id
    }
  }
`

const GET_TODOS = gql`
  {
    todos {
      id
      description
      done
    }
  }
`

const TOGGLE_DONE = gql`
  mutation ToggleDone($id: ID!) {
    toggleDone(id: $id) {
      description
      done
    }
  }
`

export default function Dashboard(props) {
  const { user, identity: netlifyIdentity } = React.useContext(IdentityContext)
  const inputRef = React.useRef("")
  // const [{ context }, send] = useMachine(TodosMachine)
  const [addTodo] = useMutation(ADD_TODO)
  const [toggleDone] = useMutation(TOGGLE_DONE)
  const { loading, error, data, refetch } = useQuery(GET_TODOS)

  const handleFormSubmit = async event => {
    event.preventDefault()
    if (inputRef.current.value.trim() === "") return

    await addTodo({ variables: { description: inputRef.current.value } })
    inputRef.current.value = ""
    await refetch()
  }

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
      <Flex as="form" onSubmit={handleFormSubmit}>
        <Label sx={{ display: "flex", alignItems: "center" }}>
          <span>Add&nbsp;todo</span>
          <Input ref={inputRef} sx={{ marginLeft: 1 }} />
        </Label>
        <Button sx={{ marginLeft: 2 }}>Add</Button>
      </Flex>
      <Flex sx={{ flexDirection: "column" }}>
        {loading && <div>loading...</div>}
        {error && <div>Something went wrong!</div>}
        {!loading && !error && (
          <ul sx={{ listStyle: "none" }}>
            {data.todos.map(todo => (
              <Flex
                as="li"
                key={todo.id}
                onClick={async () => {
                  await toggleDone({ variables: { id: todo.id } })
                  await refetch()
                }}
                sx={{ cursor: "pointer" }}
              >
                <Checkbox checked={todo.done} onChange={() => {}} />
                <span>{todo.description}</span>
              </Flex>
            ))}
          </ul>
        )}
      </Flex>
    </Container>
  )
}
