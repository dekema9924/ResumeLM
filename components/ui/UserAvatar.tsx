'use client'
import { authClient } from "@/lib/client/auth-client"
import { LogOutIcon } from "lucide-react"
import { useEffect, useState } from "react"
import LogoffButton from "./LogoffButton"

export default function UserAvatar() {
    const [session, setSession] = useState<any>()

    useEffect(() => {
        const getSession = async () => {
            const session = await authClient.getSession()
            setSession(session)
            return
        }

        getSession()
    }, [])



    return (
        <>
            <div className="absolute top-4 right-4 cursor-pointer flex items-center  gap-4">
                {/* <div
                    className="
      flex items-center justify-center
      w-10 h-10
      rounded-full
      bg-linear-to-br
      from-[#8B5CF6]
      to-[#6366F1]
      shadow-md
      ring-2 ring-white
    "
                >
                    <p className=" text-white  text-xl font-semibold">{session?.data?.user?.name.slice(0, 1)}</p>

                </div> */}
                <div className="flex text-red-600 gap-2 items-center ">
                    <LogoffButton />
                    <LogOutIcon />
                </div>

            </div>
        </>
    )
}
