const React = require("react")
const { ThemeProvider } = require("theme-ui")
const { deep } = require("@theme-ui/presets")
const Identity = require("./identity-context")

const themeWithTokens = {
  ...deep,
  sizes: {
    container: 1024
  }
}

module.exports = ({ element }) => (
  <Identity.Provider>
    <ThemeProvider theme={themeWithTokens}>{element}</ThemeProvider>
  </Identity.Provider>
)
