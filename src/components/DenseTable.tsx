import { useState, useEffect, ChangeEvent } from "react"
import { TableContent } from "./TableContent"
import { Modal, Button, TextField, InputAdornment } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { IBody, IRow } from "../types/iBody"

// interface IRow {
//     id: number
//     firstName: string
//     lastName: string
//     phone: number
//     registrationDate: string
// }

function createData(
    id: number,
    firstName: string,
    lastName: string,
    phone: number,
    registrationDate: string
): IRow {
    return { id, firstName, lastName, phone, registrationDate }
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

export const DenseTable = () => {
    const classes = useStyles()

    useEffect(() => {
        console.log("Me monte")
    }, [])

    const [rows, setRows] = useState<Array<IRow>>([
        createData(1, "Andres", "Bustamante", 78873788, "9/06/21"),
        createData(2, "Josue", "Pabon", 78569125, "10/06/21"),
        createData(3, "Grisel", "Quispe", 75567455, "11/06/21"),
    ])

    const [dataInsert, setDataInsert] = useState<IRow>({
        id: 0,
        firstName: "",
        lastName: "",
        phone: 7,
        registrationDate: "",
    })

    const [idG, setIdG] = useState<number>(0)
    const [actionModal, setActionModal] = useState<keyof IBody>("ddelete")
    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target

        setDataInsert({
            ...dataInsert,
            [name]: value,
        })
        console.log(value)
    }
    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    const handleInsert = () => {
        console.log("Insert")
        const { firstName, lastName, phone, registrationDate } = dataInsert
        let auxRows = [...rows]
        auxRows.push(
            createData(
                Math.trunc(Math.random() * 100),
                firstName || "none",
                lastName || "none",
                phone || 1111,
                new Date(Date.now()).toLocaleDateString()
            )
        )
        // registrationDate || "none"
        setRows(auxRows)
        setOpenModal(false)
        setDataInsert({
            id: 0,
            firstName: "",
            lastName: "",
            phone: 7,
            registrationDate: "",
        })
    }

    const handleEdit = () => {
        console.log("Edit")
        const { id, firstName, lastName, phone, registrationDate } = dataInsert
        let auxRows = rows.map((el: IRow) => {
            if (el.id === id) {
                return createData(
                    id,
                    firstName || "none",
                    lastName || "none",
                    phone || 1111,
                    new Date(Date.now()).toLocaleDateString()
                )
            }
            return el
        })
        // registrationDate || "none"
        setRows(auxRows)
        setOpenModal(false)
        setDataInsert({
            id: 0,
            firstName: "",
            lastName: "",
            phone: 7,
            registrationDate: "",
        })
    }

    const handleDelete = () => {
        setRows(rows.filter(row => row.id !== idG))
        setOpenModal(false)
        setIdG(0)
    }

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
        <>
            <TableContent
                rows={rows}
                toggleModal={toggleModal}
                setIdG={setIdG}
                setActionModal={setActionModal}
                setDataInsert={setDataInsert}
            />

            <Modal
                open={openModal}
                onClose={toggleModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body[actionModal]}
            </Modal>
        </>
    )
}
