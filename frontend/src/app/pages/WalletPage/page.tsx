"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

import Footer from "@/app/Shared/Footer/page";
import Navbar from "@/app/pages/HomePage/components/NavBar/page";
import Link from "next/link";
import { AccessStored, RefreshStored } from "@/app/utils/TokenStore";
import { formatCurrency } from "@/app/utils/current";

export default function Wallet() {
    const [isClient, setIsClient] = useState(false);
    const [openTopup, setOpenTopup] = useState(false);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    // const userId =

    useEffect(() => {
        fetchWalletBalance();
        setIsClient(true);
    }, [openTopup]);

    const [walletBalance, setWalletBalance] = useState<number>(0);
    const fetchWalletBalance = async () => {
        try {
            const accessToken = AccessStored.getAccessToken();

            const response = await fetch("http://localhost:8080/wallet/balance", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                credentials: "include",
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Wallet balance response:", data);
                setWalletBalance(data);
                console.log("Wallet balance fetched successfully.");
            } else {
                console.error("Failed to fetch wallet balance");
            }
        } catch (error) {
            console.error("Error fetching wallet balance:", error);
        }
    };
    const handleTopup = async (amount: string) => {

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert("Vui lòng nhập số tiền hợp lệ.");
            return;
        }

        try {

            setLoading(true);

            const accessToken = AccessStored.getAccessToken();

            const response = await fetch("http://localhost:8080/wallet/update-wallet", {

                method: "PATCH",

                headers: {

                    "Content-Type": "application/json",

                    Authorization: `Bearer ${accessToken}`,

                },

                credentials: "include",

                body: JSON.stringify({
                    userId: JSON.parse(atob(accessToken.split('.')[1])).sub._id, // Decode userId from accessToken
                    amount,
                }),

            });

            const data = await response.json();

            console.log("Response status:", response.status);

            console.log("Response data:", data);

            if (response.status == 200 && data) {
                alert("Nạp tiền thành công!");
            } else {
                if (response.status === 401) {
                    // Handle token expiration
                    const refreshResponse = await fetch("http://localhost:8080/auth/refresh-token", {
                        method: "POST",
                        credentials: "include", // Include cookies for refresh token
                    });

                    if (refreshResponse.ok) {
                        const newAccessToken = refreshResponse.headers.get("Authorization")?.split(" ")[1];
                        if (newAccessToken) {
                            AccessStored.setAccessToken(newAccessToken); // Update access token
                            return handleTopup(amount); // Retry the top-up
                        }
                    }
                    alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                } else {
                    alert("Lỗi: " + data.message);
                }
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isClient) return null;

    return (
        <div className="bg-[#f7f7f7]">
            <Navbar />

            <div className="w-full max-w-6xl mx-auto p-6 flex">
                {/* Sidebar */}
                <div className="w-1/4 bg-[#FFFFFF] shadow-md rounded-lg p-5 h-1/3 border-2 border-[#D9DCDF]">
                    <h3 className="text-lg font-semibold text-customBlue mb-4">Menu</h3>
                    <ul className="space-y-2">
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer">
                            <Link href="/dashboard" className="text-customergray hover:text-customBlue">My Dashboard</Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer">
                            <Link href="/ielts-services" className="text-customergray hover:text-customBlue">My IELTS Pres Services</Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer">
                            <Link href="/live-lessons" className="text-customergray hover:text-customBlue">My Live Lessons</Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer">
                            <Link href="/practice-history" className="text-customergray hover:text-customBlue">Practice Test History</Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer">
                            <Link href="/pages/wallet" className="text-customergray hover:text-customBlue">My Wallet</Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer">
                            <Link href="/pages/profile" className="text-customergray hover:text-customBlue">My Profile</Link>
                        </li>
                        <li className="hover:bg-blue-100 p-2 rounded-lg cursor-pointer">
                            <Link href="/referral" className="text-customergray hover:text-customBlue">Referral</Link>
                        </li>
                    </ul>
                </div>

                {/* Main Wallet Section */}
                <div className="w-3/4 p-6 ml-6 bg-[#FFFFFF]">
                    <h2 className="text-2xl text-customBlue mb-6 font-bold">My Wallet</h2>
                    <div className="bg-white shadow-md px-5 py-6 border-2 rounded-md border-[#D9DCDF]">
                        <div className="flex justify-between items-center">
                            {/* Balance and Topup */}
                            <div className="flex items-center">
                                <div className="w-32 border-2 p-2 rounded-md">
                                    <span className="text-customBlue font-bold">{(walletBalance ?? 0)} USD</span>
                                </div>
                                <Button className="w-28 p-5 text-customWhite font-bold bg-customBlue ml-3" onClick={() => setOpenTopup(true)}>
                                    Top up
                                </Button>
                            </div>

                            {/* Search */}
                            <div className="flex items-center justify-end">
                                <Input placeholder="Nhập tên đăng nhập" className="block w-full border-2 px-2 py-2 rounded-none text-black" />
                                <Button className="w-32 px-9 text-customWhite font-bold bg-customBlue ml-3">
                                    Search
                                </Button>
                            </div>
                        </div>

                        {/* Empty wallet display */}
                        <div className="flex items-center justify-center h-96 mt-5 bg-gray-100">
                            <div className="text-center">
                                <p className="mb-1 text-lg text-customBlue font-bold">There is nothing here.</p>
                                <p className="mb-4 text-sm text-customBlue font-sans">Take a look at our premium services.</p>
                                <Button className="px-8 py-2 bg-customBlue text-white">
                                    See our services
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Topup Dialog */}
            <Dialog open={openTopup} onOpenChange={setOpenTopup}>
                <DialogContent className="bg-customboldWhite">
                    <DialogHeader>
                        <DialogTitle className="text-black">Nạp tiền vào ví</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                        <div className="relative">
                            <Input
                                type="number"
                                placeholder="Nhập số tiền muốn nạp"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="text-black pr-14 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">VND</span>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            className="bg-customBlue text-white mt-4"
                            onClick={() => handleTopup(amount)}
                            disabled={loading}
                        >
                            {loading ? "Đang xử lý..." : "Xác nhận"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Footer />
        </div>
    );
}
