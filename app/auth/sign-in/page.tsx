'use client'
import Btn from '@/components/ui/Btn'
import { resendVerificationEmail, Signin } from '@/lib/server/auth-actions'
import login_bg from '@/public/assets/public/images/bg-auth.svg'
import Link from 'next/link'
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { useState } from 'react'


type inputType = {
    email: string
    password: string
}

function SignIn_page() {
    const router = useRouter()
    const [err, setErr] = useState("")
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<inputType>()
    const onSubmit: SubmitHandler<inputType> = async (data) => {
        const res = await Signin(data.email, data.password);

        if (!res.success) {
            console.log(res)
            setErr(res.code)
            if (res.code === "EMAIL_NOT_VERIFIED") {
                await resendVerificationEmail(data.email)
                router.push(
                    `/auth/check-email?email=${encodeURIComponent(data.email)}`
                );

            }

            return;
        }

        router.push("/");
    }


    return (
        <div className='flex items-center justify-center h-screen w-full p-5'>
            <div style={{ backgroundImage: `url(${login_bg.src})` }} className="bg-cover bg-no-repeat bg-center w-full h-full rounded-lg flex flex-col items-center justify-center gap-6 ">
                <h1 className="gradient-text text-5xl font-semibold">Welcome Back</h1>
                <p className="text-lg text-gray-600">Log in to continue on your Job Quest</p>

                {/* login form here */}
                <div className=" border-gray-300 text-lg bg-blue-100 w-11/12  p-6 md:w-7/12 max-w-140 flex flex-col items-center justify-center rounded-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full pt-10 h-100 rounded-lg bg-white p-5" action="">
                        <div className='flex flex-col gap-2 mb-4'>
                            <label className='text-gray-500 ' htmlFor="email">Email Address</label>
                            <input {...register("email")} className='border border-gray-300  rounded-lg p-2  outline-blue-300' type="email" name="email" id="email" placeholder='Enter your email' />
                            {err && <p className='text-sm text-red-300'>{err}</p>}

                        </div>
                        <div className='flex flex-col gap-2 mb-4'>
                            <label className='text-gray-500 ' htmlFor="password">Password</label>
                            <input {...register("password")} className='border border-gray-300  rounded-lg p-2  outline-blue-300' type="password" name="password" id="password" placeholder='Enter your password' />
                            {err && <p className='text-sm text-red-300'>{err}</p>}

                        </div>
                        <Btn
                            text='Log In'
                            className='text-white mt-10 text-lg!  px-4 hover:opacity-90 shadow-md  font-bold hover:border hover:bg-border-blue-800  w-full rounded-2xl my-6 h-14'
                        />
                    </form>
                </div>

                <p className='text-gray-600 text-xl'>
                    Don't have an account? <Link href="/auth/sign-up" className='text-blue-500 hover:underline font-semibold'>Sign Up</Link>
                </p>
            </div>


        </div >
    )
}

export default SignIn_page
