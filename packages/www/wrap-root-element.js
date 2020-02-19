const React = require("react")
const { ThemeProvider } = require("theme-ui")
const { deep } = require("@theme-ui/presets")

const themeWithTokens = {
  ...deep,
  sizes: {
    container: 1024
  }
}

module.exports = ({ element }) => (
  <ThemeProvider theme={themeWithTokens}>{element}</ThemeProvider>
)
