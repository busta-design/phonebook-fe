import { useState, useEffect, ChangeEvent } from "react"
import { TableContent } from "./TableContent"
import { ModalGen } from "./ModalGen"
import { IBody, IRow } from "../types/types"

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
        const { firstName, lastName, phone } = dataInsert
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
        const { id, firstName, lastName, phone } = dataInsert
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
        setDataInsert({
            id: 0,
            firstName: "",
            lastName: "",
            phone: 7,
            registrationDate: "",
        })
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

            <ModalGen
                openModal={openModal}
                actionModal={actionModal}
                toggleModal={toggleModal}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleInsert={handleInsert}
                dataInsert={dataInsert}
                handleChange={handleChange}
            />
        </>
    )
}
