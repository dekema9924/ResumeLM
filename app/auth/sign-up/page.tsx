'use client'


import Btn from '@/components/ui/Btn'
import { Signup } from '@/lib/server/auth-actions'
import login_bg from '@/public/assets/public/images/bg-auth.svg'
import Link from 'next/link'
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type inputType = {
    name: string
    email: string
    password: string
}


function SignUp_page() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<inputType>()
    const onSubmit: SubmitHandler<inputType> = async (data) => {
        try {
            const res = await Signup(data.name, data.email, data.password);

            if (res.success) {
                router.push(`/auth/check-email?email=${encodeURIComponent(data.email)}`);
                return;
            }

        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
            router.push('/auth/sign-in')


        }


    }




    return (
        <div className='flex items-center justify-center h-screen w-full md:p-5'>
            <div style={{ backgroundImage: `url(${login_bg.src})` }} className="bg-cover bg-no-repeat bg-center w-full h-full rounded-lg flex flex-col items-center justify-center gap-6 ">
                <h1 className="gradient-text text-5xl font-semibold">Create Account</h1>
                <p className="text-lg text-gray-600">Sign up to get started with your Job Quest</p>

                {/* login form here */}
                <div className=" border-gray-300 text-lg bg-blue-100 w-11/12  p-6 md:w-7/12 max-w-140 flex flex-col items-center justify-center rounded-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full  h-100 rounded-lg bg-white p-5" action="">
                        <div className='flex flex-col gap-2 mb-4'>
                            <label className='text-gray-500 ' htmlFor="name">Name</label>
                            <input
                                {...register("name", {
                                    required: "name is required",
                                    maxLength: {
                                        value: 20,
                                        message: "name is too long"
                                    },
                                    minLength: {
                                        value: 1,
                                        message: "name is too short"
                                    }
                                })}
                                className='border border-gray-300  rounded-lg p-2  outline-blue-300' type="text" name="name" id="name" placeholder='John Doe' />
                            {errors.name && <p className='text-sm text-red-300'>{errors.name.message}</p>}
                        </div>
                        <div className='flex flex-col gap-2 mb-4'>
                            <label className='text-gray-500 ' htmlFor="email">Email Address</label>
                            <input
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email format",
                                    },
                                })}
                                className='border border-gray-300  rounded-lg p-2  outline-blue-300' type="email" name="email" id="email" placeholder='JohnDoe@gmail.com'
                            />
                            {errors.email && <p className='text-sm text-red-300'>{errors.email.message}</p>}

                        </div>
                        <div className='flex flex-col gap-2 mb-4'>
                            <label className='text-gray-500 ' htmlFor="password">Password</label>
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Minimum 8 characters",
                                    },
                                    maxLength: {
                                        value: 64,
                                        message: "Password too long",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                        message: "Must include uppercase, lowercase, and number",
                                    },
                                })}
                                className='border border-gray-300  rounded-lg p-2  outline-blue-300' type="password" name="password" id="password" placeholder='**********'
                            />
                            {errors.password && <p className='text-sm text-red-300'>{errors.password.message}</p>}

                        </div>
                        {/* <button className='bg-linear-to-br from-blue-300 via-blue-400 to-cyan-50 text-white py-4 px-4 hover:opacity-90 font-bold hover:border hover:bg-border-blue-800 shadow-md  w-full rounded-2xl my-6 cursor-pointer' type='submit'>Sign Up</button> */}
                        <Btn
                            text='Sign Up'
                            className='text-white mt-14 text-lg! py-4 px-4 hover:opacity-90 shadow-md  font-bold hover:border hover:bg-border-blue-800  w-full rounded-2xl my-6 h-14'
                        />
                    </form>
                </div>

                <p className='text-gray-600 text-xl mt-14'>
                    Already have an account? <Link href="/auth/sign-in" className='text-blue-500 hover:underline font-semibold'>Sign In</Link>
                </p>
            </div>


        </div >
    )
}

export default SignUp_page
