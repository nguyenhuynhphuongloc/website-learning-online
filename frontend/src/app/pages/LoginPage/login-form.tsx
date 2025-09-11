"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import axiosInstance from "@/app/utils/RefeshTokenHandler"
import { signInSchema } from "@/lib/type"
import { createSession } from "@/lib/session"



export function LoginForm() {

    const router = useRouter(); // ✅ Không bị lỗi nữa

    type FormType = z.infer<typeof signInSchema>

    const form = useForm<FormType>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: "",
            password: "",
            email: "",
        },
        mode: "onSubmit", // Kiểm tra dữ liệu khi form được gửi
        disabled: false, // Không vô hiệu hóa form, cho phép người dùng tương tác
        reValidateMode: "onSubmit", // Xác thực lại khi giá trị của các trường thay đổi
        delayError: 0, // Trì hoãn 500ms trước khi hiển thị lỗi validation
    })

   
    async function onSubmit(values: z.infer<typeof signInSchema>) {
           
             const response = await axiosInstance.post('http://localhost:8080/auth/login', values);

             const Session = {
                user: response.data.user,
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token
             }

            await createSession(Session)

            router.push('/pages/homepage')
            
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-shrink-0 w-[600px]">
                <div className="flex justify-center"> <span className="text-customBlue justify-center text-4xl font-sans">Login to your account</span></div>
                {/* Username Field */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold text-customBlue p-2">Username</FormLabel>
                            <FormControl>
                                <Input className="text-black" placeholder="Nhập tên đăng nhập" autoComplete="off" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Password Field */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold text-customBlue p-2">Mật khẩu</FormLabel>
                            <FormControl>
                                <Input className="text-black" placeholder="Nhập mật khẩu" type="password" autoComplete="off"  {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                {/* Email Field */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold text-customBlue p-2">Email</FormLabel>
                            <FormControl>
                                <Input className="text-black" placeholder="Nhập email" autoComplete="off" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button className="!mt-5 w-full bg-customBlue text-customMintBlue hover:bg-customBlue hover:shadow-none" type="submit">Login</Button>

                <div className="mt-3">
                    <Link href="/ielts-prep/preparation-tips" className="" >
                        <span className="text-customebrightBlue">Forgot password?</span>
                    </Link>
                </div>

                <div className="flex items-center">
                    <div className="flex-1 bg-customebrightBlue w-full h-[0.25px] rounded-sm"></div>
                     <span className="text-xl text-customBlue font-bold">Or</span>
                    <div className="flex-1 bg-customebrightBlue w-full h-[0.25px] rounded-sm"></div>
                </div>

                <div className="flex items-center justify-center gap-8 ">
                    <Button onClick={() => {
                        window.location.href = 'http://localhost:8080/auth/google/login';
                    }}
                    className="bg-[#df4930] rounded-sm p-5 text-customelightWhite hover:bg-[#df4930] hover:shadow-none w-[450px]">
                        Login with Google
                    </Button>

                  

                </div>


                <div className="flex justify-center">
                    <span>Don’t have an account? </span>
                    <Link href="/pages/register" className="ml-1">
                        <span className="text-customBlue font-serif">Create one now!</span>
                    </Link>

                </div>


            </form>
        </Form>
    );
}
