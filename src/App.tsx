import { CssBaseline, Typography } from "@material-ui/core"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { darkTheme } from "./themes"
import { DenseTable } from "./components/DenseTable"

function App() {
  return (
    <div>
      <MuiThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Typography variant="h1">Agenda de Contactos</Typography>
        <DenseTable />
      </MuiThemeProvider>
    </div>
  )
}

export default App
