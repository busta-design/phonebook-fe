import { useState, useEffect } from "react"
import { TableContent } from "./TableContent"
import { Modal, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

interface IRow {
    id: number
    firstName: string
    lastName: string
    phone: number
    registrationDate: string
}

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
}))

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

    const [idG, setIdG] = useState<number>(0)
    const [openModal, setOpenModal] = useState<boolean>(false)

    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    const handleInsert = () => {
        // setRows(rows.filter(row => row.id !== idG))
        // setOpenModal(false)
        // setIdG(0)
    }

    const handleDelete = () => {
        setRows(rows.filter(row => row.id !== idG))
        setOpenModal(false)
        setIdG(0)
    }

    const modalStyle = {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
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

    const body = {
        ddelete,
        insert,
    }

    return (
        <>
            <TableContent
                rows={rows}
                toggleModal={toggleModal}
                setIdG={setIdG}
            />

            <Modal
                open={openModal}
                onClose={toggleModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body.insert}
            </Modal>
        </>
    )
}
