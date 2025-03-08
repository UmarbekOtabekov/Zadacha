import axios from "axios"
import { useEffect, useState } from "react"
import { DataInfoType } from "../@types/types"
import { FaDeleteLeft } from "react-icons/fa6"
import { toast } from "react-toastify"
import Modal from "../Components/Modal"

export function Home() {
    const [info, setInfo] = useState<DataInfoType[]>([])
    const [ism, setIsm] = useState<string>("")
    const [qarz, setQarz] = useState<number | undefined>(0)
    const [modal, setModal] = useState<boolean>(false)
    const sana = new Date()
    const year = sana.getFullYear().toString().padStart(2, "0");
    const month = (sana.getMonth() + 1).toString().padStart(2, "0");
    const day = sana.getDate().toString().padStart(2, "0")
    const vaqt = `${day}/${month}/${year}`
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const newData = {
            ism: ism,
            qarz: qarz,
            date: vaqt,
            status: false
        }
        event.preventDefault()
        try {
            await axios.post("http://localhost:5000/qarz", newData)
            toast.success("Malumot qoshildi!!")
        } catch (err) { }
        try {
            await axios.post("http://localhost:5000/tarix", newData)
        } catch (err) { }
    }
    async function getData() {
        try {
            const res = await axios.get("http://localhost:5000/qarz");
            setInfo(res.data)
        } catch (err) { }
    }
    useEffect(() => {
        getData()
    }, [])

    const handleDelete = async (id: string | number) => {
        try {
            await axios.delete(`http://localhost:5000/qarz/${id}`)
            toast.success("Malumot o'chirildi!")
        } catch (err) { }
    }
    const handleEdit = async (id: string | number) => {
        try {
            await axios.put(`http://localhost:5000/qarz/${id}`,)
        } catch (err) { }
    }
    return (
        <main className="px-30 py-10">
            <form onSubmit={handleSubmit} className="flex gap-3 items-center flex-col justify-center">
                <input required minLength={3} onChange={e => setIsm(e.target.value)} type="text" placeholder="Ismingizni kiriting" className="border-2 w-96 outline-0 rounded-lg p-1 " />
                <input required minLength={3} onChange={e => setQarz(+e.target.value)} type="number" placeholder="Qarz summasini kiriting" className="border-2 w-96 outline-0 rounded-lg p-1 " />
                <input required minLength={3} type="date" placeholder="Qarz summasini kiriting" className="border-2 w-96 cursor-pointer outline-0 rounded-lg p-1 " />
                <button className="p-2 bg-blue-600 text-white rounded-md w-96 cursor-pointer text-lg font-medium">
                    Kiritish
                </button>
            </form>
            <table className="min-w-full table-auto mt-10 border-collapse">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2 border-b">№</th>
                        <th className="px-4 py-2 border-b">Ism</th>
                        <th className="px-4 py-2 border-b">Qarzi</th>
                        <th className="px-4 py-2 border-b">Sana</th>
                        <th className="px-4 py-2 border-b">Buttons</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        info.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="pl-4 py-2 border-b">{index + 1}</td>
                                <td className="pl-4 py-2 border-b">{item.ism}</td>
                                <td className="pl-4 py-2 border-b">{item.qarz}</td>
                                <td className="pl-4 py-2 border-b">{item.date}</td>
                                <td className="pl-4 flex gap-5 items-center py-2 border-b">
                                    <button onClick={() => handleDelete(item.id)} className="text-red-600 flex items-center gap-2 font-medium text-lg cursor-pointer">
                                        Delete<FaDeleteLeft />
                                    </button>
                                    <button onClick={() => { handleEdit(item.id); setModal(true) }} className="text-lg text-yellow-400 cursor-pointer font-medium">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {
                modal && <Modal />
            }
        </main>
    )
}