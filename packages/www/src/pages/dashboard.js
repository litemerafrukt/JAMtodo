import React from "react"
import { Container, Flex, Button, Input, Label, NavLink, Checkbox } from "theme-ui"
import { Link } from "@reach/router"
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

export default function Dashboard(props) {
  const { user, identity: netlifyIdentity } = React.useContext(IdentityContext)
  const inputRef = React.useRef()
  const [{ context }, send] = useMachine(TodosMachine)

  const handleFormSubmit = event => {
    event.preventDefault()
    send({ type: "ADD", description: inputRef.current.value })
    inputRef.current.value = ""
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
        <ul sx={{ listStyle: "none" }}>
          {context.todos.map(todo => (
            <Flex
              as="li"
              key={todo.id}
              onClick={() => send({ type: "TOGGLE", id: todo.id })}
              sx={{ cursor: "pointer" }}
            >
              <Checkbox checked={todo.done} onChange={() => {}} />
              <span>{todo.description}</span>
            </Flex>
          ))}
        </ul>
      </Flex>
    </Container>
  )
}
