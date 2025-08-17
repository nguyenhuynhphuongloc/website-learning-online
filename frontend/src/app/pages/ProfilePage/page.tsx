"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CameraIcon } from "lucide-react";
import { format } from "date-fns";
import { z } from "zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Navbar from "@/app/pages/HomePage/components/NavBar/page";
import Link from "next/link";
import ModalSaveProfile from "@/app/Shared/Modal/mobal_update";

// Define ProfileSchema with fixed validation for lastname
const ProfileSchema = z.object({
    firstName: z.string().min(2, { message: "Tên đăng nhập phải có ít nhất 2 kí tự" }),
    lastName: z.string().min(2, { message: "Họ tên phải có ít nhất 2 kí tự" }),
    DateofBirth: z.date({
        required_error: "Ngày sinh là bắt buộc",
    }),
    gender: z.enum(["male", "female"], { message: "Giới tính là bắt buộc" }),
    email: z.string().email({ message: "Địa chỉ email không hợp lệ" }).optional(),
    phoneNumber: z.string().optional(),
});

export default function ProfilePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [profileData, setProfileData] = useState<z.infer<typeof ProfileSchema> | null>(null);

    useEffect(() => {
        setIsClient(true);
        // Gọi API để lấy thông tin profile khi component mount
        const fetchProfile = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");
                if (!accessToken) throw new Error("No access token found");

                const response = await fetch("http://localhost:8080/user/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                const formattedData = {
                    ...data,
                    DateofBirth: data.DateofBirth && !isNaN(new Date(data.DateofBirth).getTime())
                        ? new Date(data.DateofBirth)
                        : new Date(), // Fallback nếu không hợp lệ
                };
                setProfileData(formattedData);


            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    const minDate = useMemo(() => new Date("1900-01-01"), []);
    const maxDate = useMemo(() => new Date(), []);

    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            gender: "male",
            firstName: "",
            lastName: "",
            DateofBirth: new Date(),
            email: "",
            phoneNumber: "",
            ... (profileData || {}), // Gộp dữ liệu từ API nếu có
        },
    });

    // Cập nhật form khi profileData thay đổi
    useEffect(() => {
        if (profileData) {
            form.reset(profileData);
        }
    }, [profileData, form]);

    // Hàm onSave để gọi API
    const handleSave = async () => {
        const data = form.getValues();
        try {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                throw new Error("No access token found");
            }

            const response = await fetch(`http://localhost:8080/user/updateProfile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Profile updated successfully:", result);
            // setIsSuccess(true) sẽ được xử lý trong modal
        } catch (error) {
            console.error("Error updating profile:", error);
            // Lỗi sẽ được xử lý trong modal (setIsSuccess không thay đổi)
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (!isClient) {
        return null;
    }

    return (
        <div className="bg-white">
            <Navbar />

            <div className="w-full max-w-6xl mx-auto p-6 flex">
                <div className="w-1/4 bg-white shadow-md rounded-lg p-5 h-1/3 border-2">
                    {/* Menu */}
                    <h3 className="text-lg font-semibold text-customBlue mb-4">Menu</h3>
                    <ul className="space-y-2">
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer">
                            <Link href="/dashboard" className="text-customergray hover:text-customBlue">
                                My Dashboard
                            </Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer">
                            <Link href="/ielts-services" className="text-customergray hover:text-customBlue">
                                My IELTS Pres Services
                            </Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer">
                            <Link href="/live-lessons" className="text-customergray hover:text-customBlue">
                                My Live Lessons
                            </Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer">
                            <Link href="/practice-tests" className="text-customergray hover:text-customBlue">
                                Practice Test History
                            </Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer">
                            <Link href="/pages/wallet" className="text-customergray hover:text-customBlue">
                                My Wallet
                            </Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer">
                            <Link href="/profile" className="text-customergray hover:text-customBlue">
                                My Profile
                            </Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer">
                            <Link href="/referral" className="text-customergray hover:text-customBlue">
                                Referral
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="w-3/4 bg-white shadow-md rounded-lg p-6 ml-6 border-2">
                    {/* Profile Form */}
                    <Avatar className="mx-auto">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="h-25 w-25" />
                    </Avatar>
                    <button className="mt-4 bg-customBlue text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none flex items-center space-x-2 mx-auto">
                        <CameraIcon className="h-5 w-5" />
                        <span>Edit Photo</span>
                    </button>

                    <h2 className="text-2xl text-customBlue mb-6">My Profile</h2>
                    <Form {...form}>
                        <form onSubmit={(e) => { e.preventDefault(); openModal(); }}>
                            <div className="flex flex-col gap-12">
                                {/* First Name and Last Name */}
                                <div className="flex gap-[24px]">
                                    <FormField
                                        control={form.control}
                                        name="firstName"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2 gap-4">
                                                <FormLabel className="text-customBlue mb-9 font-semibold">First name *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nhập tên đăng nhập"
                                                        {...field}
                                                        className="block w-full border-customBlue rounded-md sm:text-sm border-2 px-2 py-2 text-black"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="lastName"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormLabel className="text-customBlue font-semibold">Last name *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nhập tên đăng nhập"
                                                        {...field}
                                                        className="block w-full border-customBlue rounded-md sm:text-sm border-2 px-2 py-2 text-black"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* Date of Birth and Gender */}
                                <div className="flex gap-4">
                                    <FormField
                                        control={form.control}
                                        name="DateofBirth"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormLabel className="text-customBlue font-semibold">Date of Birth *</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant="outline"
                                                                className="w-full text-left hover:bg-white hover:text-black bg-white text-black"
                                                            >
                                                                {field.value ? format(new Date(field.value), "PPP") : <div>Pick a date</div>}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) => date > maxDate || date < minDate}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2 ml-12">
                                                <FormLabel className="text-customBlue font-semibold">Gender *</FormLabel>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    value={field.value}
                                                    className="flex gap-6 items-center mt-2"
                                                >
                                                    <FormItem className="flex items-center space-x-2">
                                                        <FormControl>
                                                            <RadioGroupItem
                                                                value="male"
                                                                className="h-5 w-5 bg-customWhite border-2 border-customBlue"
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-gray-700 m-0 text-center">Male</FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-2">
                                                        <FormControl>
                                                            <RadioGroupItem
                                                                value="female"
                                                                className="h-5 w-5 bg-customWhite border-2 border-customBlue"
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="m-0 text-gray-700">Female</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* Email and Phone */}
                                <div className="flex gap-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormLabel className="text-customBlue font-semibold">Email *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nhập email"
                                                        {...field}
                                                        className="block w-full border-customBlue rounded-md sm:text-sm border-2 px-2 py-2 text-black"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phoneNumber"
                                        render={({ field }) => (
                                            <FormItem className="w-1/2">
                                                <FormLabel className="text-customBlue font-semibold">Phone number *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nhập số điện thoại"
                                                        {...field}
                                                        className="block w-full border-customBlue rounded-md sm:text-sm border-2 px-2 py-2 text-black"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {/* Submit Button */}
                                <div className="mt-6 flex justify-end">
                                    <Button
                                        type="submit"
                                        className="bg-customBlue text-white hover:bg-customBlue-dark focus:ring-customBlue focus:border-customBlue px-5 py-5"
                                    >
                                        Save changes
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>

                    {/* Modal for success message */}
                    <ModalSaveProfile
                        visible={isModalOpen}
                        closeModal={closeModal}
                        onSave={handleSave}
                    />
                </div>
            </div>
        </div>
    );
}