import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { DataInfoType } from "../@types/types"

export function Home() {
    const [info, setInfo] = useState<DataInfoType[]>([])
    const [ism, setIsm] = useState<string>("")
    const [qarz, setQarz] = useState<number | undefined>(0)
    const sana = new Date()
    const year = sana.getFullYear().toString().padStart(2, "0");
    const month = (sana.getMonth() + 1).toString().padStart(2, "0");
    const day = sana.getDate().toString().padStart(2, "0")
    const vaqt = `${day}/${month}/${year}`
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const newData = {
            ism: ism,
            qarz: qarz,
            date: vaqt
        }
        event.preventDefault()
        try {
            await axios.post("http://localhost:5000/qarz", newData)
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
    return (
        <main className="px-30 py-10">
            <form onSubmit={handleSubmit} className="flex gap-3 items-center flex-col justify-center">
                <input onChange={e => setIsm(e.target.value)} type="text" placeholder="Ismingizni kiriting" className="border-2 w-96 outline-0 rounded-lg p-1 " />
                <input onChange={e => setQarz(+e.target.value)} type="number" placeholder="Qarz summasini kiriting" className="border-2 w-96 outline-0 rounded-lg p-1 " />
                <input type="date" placeholder="Qarz summasini kiriting" className="border-2 w-96 cursor-pointer outline-0 rounded-lg p-1 " />
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
                    </tr>
                </thead>
                <tbody>
                    {
                        info.map((item, index) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{index + 1}</td>
                                <td className="px-4 py-2 border-b">{item.ism}</td>
                                <td className="px-4 py-2 border-b">{item.qarz}</td>
                                <td className="px-4 py-2 border-b">{item.date}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </main>
    )
}