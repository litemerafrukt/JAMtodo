const React = require("react")
const { ThemeProvider } = require("theme-ui")
const { deep } = require("@theme-ui/presets")
const { Provider } = require("./identity-context")

const themeWithTokens = {
  ...deep,
  sizes: {
    container: 1024
  }
}

module.exports = ({ element }) => (
  <Provider>
    <ThemeProvider theme={themeWithTokens}>{element}</ThemeProvider>
  </Provider>
)
