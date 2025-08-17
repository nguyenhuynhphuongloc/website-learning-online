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
import { RegisterSchema } from "@/lib/zod"
import axiosInstance from "@/app/utils/RefeshTokenHandler"
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation"
import { toast } from 'react-toastify';

export function RegisterForm() {
    
    const router = useRouter(); // ✅ Không bị lỗi nữa

    type FormType = z.infer<typeof RegisterSchema>

    const form = useForm<FormType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            username: "",
            password: "",
            confirmPassword: "",
            email: "",
        },
        mode: "onSubmit", // Kiểm tra dữ liệu khi form được gửi
        disabled: false, // Không vô hiệu hóa form, cho phép người dùng tương tác
        reValidateMode: "onSubmit", // Xác thực lại khi giá trị của các trường thay đổi
        delayError: 0, // Trì hoãn 500ms trước khi hiển thị lỗi validation
    })

    // Hàm xử lý đăng ký
    async function onSubmit(values: z.infer<typeof RegisterSchema>) {
        try {
            const response = await axiosInstance.post('http://localhost:8080/auth/sign-up', values);

            if (response.status === 201 || response.status === 200) {
                toast.success("Đăng ký thành công! Bạn sẽ được chuyển hướng đến trang chính.");
                router.push('/pages/login');

            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                const errorMessage = error.response.data.message;

                // Kiểm tra lỗi email đã tồn tại và hiển thị thông báo lỗi cho trường email
                if (errorMessage.includes("Email already exists")) {
                    // Sử dụng react-hook-form để set lỗi cho trường email
                    form.setError("email", {
                        type: "manual",
                        message: errorMessage,  // Hiển thị thông báo lỗi email
                    });
                }

                toast.error("Đăng ký thất bại! Vui lòng kiểm tra lại thông tin và thử lại.");
                console.error("Lỗi đăng ký:", errorMessage);
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-shrink-0 w-[600px]">
                <div className="flex justify-center">
                    <span className="text-customBlue justify-center text-4xl font-sans">CREATE AN ACCOUNT</span>
                </div>

                {/* Username Field */}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold text-customBlue p-2">Username</FormLabel>
                            <FormControl>
                                <Input className="text-black" placeholder="Please enter your username" autoComplete="off" {...field} />
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
                            <FormLabel className="font-bold text-customBlue p-2">Password</FormLabel>
                            <FormControl>
                                <Input className="text-black" placeholder="Please enter your password" type="password" autoComplete="off" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Confirm Password Field */}
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-bold text-customBlue p-2">Confirm password</FormLabel>
                            <FormControl>
                                <Input className="text-black" placeholder="Please confirm your password" type="password" autoComplete="off" {...field} />
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
                                <Input
                                    className="text-black"
                                    placeholder="Nhập email"
                                    autoComplete="off"
                                    {...field}
                                />
                            </FormControl>
                            {/* Hiển thị lỗi nếu có */}
                            {form.formState.errors.email && (
                                <FormMessage>
                                    {form.formState.errors.email.message}
                                </FormMessage>
                            )}
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button
                    className="!mt-5 w-full bg-customBlue text-customMintBlue hover:bg-customBlue hover:text-customMintBlue hover:shadow-none hover:brightness-100"
                    type="submit"
                >
                    Register
                </Button>
                
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
            </form>
        </Form>
    );
}
