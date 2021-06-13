import { ChangeEvent } from "react"
import { Modal, Button, TextField, InputAdornment } from "@material-ui/core"
import { IBody, IRow } from "../types/types"
import { makeStyles } from "@material-ui/core/styles"

interface IModalProps {
    openModal: boolean
    actionModal: keyof IBody
    toggleModal: () => void
    handleEdit: () => void
    handleDelete: () => void
    handleInsert: () => void
    handleChange: (ev: ChangeEvent<HTMLInputElement>) => void
    dataInsert: IRow
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    textfield: {
        "& > *": {
            margin: theme.spacing(1),
            width: "25ch",
        },
    },
}))
const modalStyle = {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
}

export const ModalGen = ({
    openModal,
    actionModal,
    toggleModal,
    handleEdit,
    handleDelete,
    handleInsert,
    dataInsert,
    handleChange,
}: IModalProps) => {
    const classes = useStyles()

    const ddelete = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Delete</h2>
            <p id="simple-modal-description">
                Are you sure that deleting this row?
            </p>
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleDelete()}
            >
                Yes
            </Button>{" "}
            <Button variant="text" color="secondary" onClick={toggleModal}>
                Cancel
            </Button>
        </div>
    )

    const insert = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Insert</h2>
            <p id="simple-modal-description">Enter the information</p>
            <form className={classes.textfield} noValidate autoComplete="off">
                <TextField
                    name="firstName"
                    label="First Name"
                    value={dataInsert.firstName}
                    onChange={handleChange}
                />
                <TextField
                    name="lastName"
                    label="Last Name"
                    value={dataInsert.lastName}
                    onChange={handleChange}
                />

                <TextField
                    name="phone"
                    label="Phone"
                    value={dataInsert.phone}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                +591
                            </InputAdornment>
                        ),
                    }}
                />
            </form>
            <div style={{ marginTop: "15px" }} />
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleInsert()}
            >
                Insert
            </Button>{" "}
            <Button variant="text" color="secondary" onClick={toggleModal}>
                Cancel
            </Button>
        </div>
    )

    const edit = (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="simple-modal-title">Edit</h2>
            <p id="simple-modal-description">Change the information</p>
            <form className={classes.textfield} noValidate autoComplete="off">
                <TextField
                    name="firstName"
                    label="First Name"
                    value={dataInsert.firstName}
                    onChange={handleChange}
                />
                <TextField
                    name="lastName"
                    label="Last Name"
                    value={dataInsert.lastName}
                    onChange={handleChange}
                />

                <TextField
                    name="phone"
                    label="Phone"
                    value={dataInsert.phone}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                +591
                            </InputAdornment>
                        ),
                    }}
                />
            </form>
            <div style={{ marginTop: "15px" }} />
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleEdit()}
            >
                Upload
            </Button>{" "}
            <Button variant="text" color="secondary" onClick={toggleModal}>
                Cancel
            </Button>
        </div>
    )

    const body: IBody = {
        ddelete,
        insert,
        edit,
    }

    return (
        <Modal
            open={openModal}
            onClose={toggleModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body[actionModal]}
        </Modal>
    )
}
