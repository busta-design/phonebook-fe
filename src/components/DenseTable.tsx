import { useState, useEffect, ChangeEvent, Dispatch } from "react"
import { TableContent } from "./TableContent"
import { ModalGen } from "./ModalGen"
import { SnackbarMessage } from "./SnackbarMessage"
import { IBody, IRow } from "../types/types"
import axios from "axios"

const getData = async (setRows: Dispatch<React.SetStateAction<IRow[]>>) => {
    const response = await axios.get(`https://localhost:44328/api/Contact`)
    const data: Array<IRow> = response.data
    setRows(data)
}

const deleteFact = async (id: number) => {
    const info = await axios.delete(`https://localhost:44328/api/Contact/${id}`)
    const response = info.data
}

const insertFact = async (row: IRow) => {
    const info = await axios.post(`https://localhost:44328/api/Contact`, row)
    const response = info.data
}

const editFact = async (row: IRow) => {
    const info = await axios.put(
        `https://localhost:44328/api/Contact/${row.id}`,
        row
    )
    const response = info.data
}

export const DenseTable = () => {
    useEffect(() => {
        getData(setRows)
    }, [])

    const [rows, setRows] = useState<Array<IRow>>([])

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

    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [messageSnackbar, setMessageSnackbar] = useState<string>("")

    const refresh = async (actionName: string) => {
        await getData(setRows)
        setMessageSnackbar(actionName)
        setOpenSnackbar(true)
    }

    const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target
        setDataInsert({
            ...dataInsert,
            [name]: value,
        })
    }
    const toggleModal = () => {
        setOpenModal(!openModal)
    }

    const handleInsert = async () => {
        await insertFact({
            ...dataInsert,
            registrationDate: new Date(Date.now()).toLocaleDateString(),
        })
        await refresh("Dato Agregado")
        setOpenModal(false)
        setDataInsert({
            id: 0,
            firstName: "",
            lastName: "",
            phone: 7,
            registrationDate: "",
        })
    }

    const handleEdit = async () => {
        await editFact({
            ...dataInsert,
            registrationDate: new Date(Date.now()).toLocaleDateString(),
        })
        await refresh("Dato Editado")
        setOpenModal(false)
        setDataInsert({
            id: 0,
            firstName: "",
            lastName: "",
            phone: 7,
            registrationDate: "",
        })
    }
    const handleDelete = async () => {
        await deleteFact(idG)
        await refresh("Dato Eliminado")
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
                refresh={refresh}
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

            <SnackbarMessage
                openSnackbar={openSnackbar}
                setOpenSnackbar={setOpenSnackbar}
                messageSnackbar={messageSnackbar}
            />
        </>
    )
}
