import { CssBaseline, Typography } from "@material-ui/core"
import { MuiThemeProvider } from "@material-ui/core/styles"
import { darkTheme } from "./themes"
import { DenseTable } from "./components/DenseTable"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles({
    title: {
        width: "1000px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "30px",
    },
})

function App() {
    const classes = useStyles()
    return (
        <div>
            <MuiThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Typography className={classes.title} variant="h1">
                    Agenda de Contactos
                </Typography>
                <DenseTable />
            </MuiThemeProvider>
        </div>
    )
}

export default App
