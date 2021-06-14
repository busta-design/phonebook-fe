import { Snackbar, IconButton, SnackbarCloseReason } from "@material-ui/core"
import { Close } from "@material-ui/icons"

interface ISnack {
    openSnackbar: boolean
    setOpenSnackbar: (o: boolean) => void
    messageSnackbar: string
}

export const SnackbarMessage = ({
    openSnackbar,
    setOpenSnackbar,
    messageSnackbar,
}: ISnack) => {
    const handleSnackClose = (
        event: React.SyntheticEvent<any, Event>,
        reason: SnackbarCloseReason = "timeout"
    ) => {
        if (reason === "clickaway") {
            return
        }

        setOpenSnackbar(false)
    }
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleSnackClose}
            message={messageSnackbar}
            action={
                <>
                    <IconButton
                        size="small"
                        aria-label="close-snakcbar"
                        color="inherit"
                        onClick={handleSnackClose}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                </>
            }
        />
    )
}
