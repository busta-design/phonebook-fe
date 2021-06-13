import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@material-ui/core"
import { Button, Paper } from "@material-ui/core"

import { Modals } from "../constants/modals"

import { makeStyles } from "@material-ui/core/styles"
import { IRow } from "../types/iBody"

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    container: {
        maxWidth: 1500,
        margin: "auto",
        marginTop: "50px",
        textAlign: "center",
    },
    button: {
        maxWidth: 500,
        marginBottom: "10px",
        marginTop: "10px",
    },
})

// interface IRow {
//     id: number
//     firstName: string
//     lastName: string
//     phone: number
//     registrationDate: string
// }

type IBoth = {
    rows: Array<IRow>
    toggleModal: () => void
    setIdG: (id: number) => void
    setActionModal: (actionModal: any) => void
    setDataInsert: (data: IRow) => void
}

export const TableContent = ({
    rows,
    toggleModal,
    setIdG,
    setActionModal,
    setDataInsert,
}: IBoth) => {
    const classes = useStyles()
    return (
        <div>
            <TableContainer component={Paper} className={classes.container}>
                <Table
                    className={classes.table}
                    size="medium"
                    aria-label="a dense table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>id</TableCell>
                            <TableCell align="right">First Name</TableCell>
                            <TableCell align="right">Last Name</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">
                                Registration Date
                            </TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">
                                    {row.firstName}
                                </TableCell>
                                <TableCell align="right">
                                    {row.lastName}
                                </TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                                <TableCell align="right">
                                    {row.registrationDate}
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setIdG(row.id)
                                            setDataInsert({
                                                id: row.id,
                                                firstName: row.firstName,
                                                lastName: row.lastName,
                                                phone: row.phone,
                                                registrationDate:
                                                    row.registrationDate,
                                            })
                                            setActionModal(Modals.Edit)
                                            toggleModal()
                                        }}
                                    >
                                        Edit
                                    </Button>{" "}
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => {
                                            setIdG(row.id)
                                            setActionModal(Modals.Delete)
                                            toggleModal()
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button
                    className={classes.button}
                    variant="contained"
                    // onClick={setActionModal(Object.keys(IBody).find(key: string => key === 'insert'))}
                    color="primary"
                    onClick={() => {
                        setActionModal(Modals.Insert)
                        toggleModal()
                    }}
                >
                    Insert new Contact
                </Button>
            </TableContainer>
        </div>
    )
}
