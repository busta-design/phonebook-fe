import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Paper } from "@material-ui/core"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"

interface IRow {
  id: number
  firstName: string
  lastName: string
  phone: number
  registrationDate: string
}

const handleEdit = (id: number) => {
  console.log("editar ", id)
}

const handleDelete = (id: number) => {
  console.log("borrar ", id)
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    maxWidth: 1500,
    margin: "auto",
    marginTop: "50px",
  },
})

function createData(
  id: number,
  firstName: string,
  lastName: string,
  phone: number,
  registrationDate: string
): IRow {
  return { id, firstName, lastName, phone, registrationDate }
}

export const DenseTable = () => {
  const [rows, setRows] = useState<Array<IRow>>([
    createData(1, "Andres", "Bustamante", 78873788, "9/06/21"),
    createData(2, "Josue", "Pabon", 78569125, "10/06/21"),
  ])
  const classes = useStyles()
  return (
    <>
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
              <TableCell align="right">Registration Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.firstName}</TableCell>
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="right">{row.phone}</TableCell>
                <TableCell align="right">{row.registrationDate}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(row.id)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(row.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
