'use client'
import { Signout } from "@/lib/server/auth-actions"
import toast from "react-hot-toast"

export default function LogoffButton() {

    const HandleSignOut = async () => {
        try {
            const res = await Signout()
            if (res.success) {
                toast.success("logout successfull!")
                window.location.reload()
            }
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <button onClick={() => HandleSignOut()} className='text-red-600 font-bold text-md cursor-pointer'>Sign Out</button>
    )
}
