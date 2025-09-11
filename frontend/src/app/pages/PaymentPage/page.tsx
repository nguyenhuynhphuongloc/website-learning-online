"use client";

import React, { useState } from "react";
import Footer from "@/app/Shared/Footer/page";

import { DataTable } from "@/app/pages/PaymentPage/data-table";
import { Button } from "@/components/ui/button";
import { columns, Payment } from "@/app/pages/PaymentPage/column";
import Navbar from "@/app/pages/HomePage/components/NavBar/page";

async function getData(): Promise<Payment[]> {
    return [
        {
            course: "IELTS MasterClass 2",
            entryLevel: "IELTS 0.0",
            outcome: "IELTS 2.0",
            courseLength: "50 hours",
            price: 200,
        },
        {
            course: "JavaScript Basics",
            entryLevel: "Beginner",
            outcome: "Intermediate",
            courseLength: "20 hours",
            price: 100,
        },
        {
            course: "React Advanced",
            entryLevel: "Intermediate",
            outcome: "Advanced",
            courseLength: "30 hours",
            price: 150,
        },
    ];
}

export default function PaymentPage() {
    const [selectedCourses, setSelectedCourses] = useState<Payment[]>([]);

    const handleCourseSelection = (course: Payment, isSelected: boolean) => {
        if (isSelected) {
            setSelectedCourses((prev) => [...prev, course]);
        } else {
            setSelectedCourses((prev) =>
                prev.filter((c) => c.course !== course.course)
            );
        }
    };

    function convertUSDToVND(usd: number): string {
        const exchangeRate = 23500;
        const vnd = usd * exchangeRate;


        return vnd.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    }

    const totalCost = selectedCourses.reduce((sum, course) => sum + course.price, 0);

    const data = [
        {
            course: "IELTS MasterClass 2",
            entryLevel: "IELTS 0.0",
            outcome: "IELTS 2.0",
            courseLength: "50 hours",
            price: 200,
        },
        {
            course: "JavaScript Basics",
            entryLevel: "Beginner",
            outcome: "Intermediate",
            courseLength: "20 hours",
            price: 100,
        },
        {
            course: "React Advanced",
            entryLevel: "Intermediate",
            outcome: "Advanced",
            courseLength: "30 hours",
            price: 150,
        },
    ];

    return (
        <div>
            <Navbar />
            <div className="w-full max-w-6xl mx-auto p-6 flex">
                <div className="w-3/4 bg-white shadow-md rounded-lg p-5 h-1/3 border-2">
                    <h2 className="text-customBlue text-3xl font-bold">Select courses</h2>
                    <div className="container mx-auto py-10">
                        <DataTable
                            columns={columns(handleCourseSelection, selectedCourses)}
                            data={data}
                        />
                    </div>
                </div>

                <div className="w-1/4 bg-white shadow-md rounded-lg p-6 ml-6 border-2 h-52">
                    <h2 className="text-customBlue font-bold text-2xl">Order Summary</h2>
                    <div className="mt-4 space-y-4">

                        <div className="flex items-center justify-between font-bold">
                            <span>Total Cost:</span>
                            <span>{totalCost} USD</span>
                        </div>

                        <div

                            className="flex items-center justify-between"
                        >
                            <span className="text-gray-700">({selectedCourses.length} course)</span>
                            <span className="text-gray-700">{convertUSDToVND(totalCost)} USD</span>
                        </div>

                        <Button className="w-full bg-customebrightBlue mt-4">
                            GO TO CHECKOUT
                        </Button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
