"use client";

import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TfiAlignJustify, TfiFullscreen } from "react-icons/tfi";
import { CiLogout } from "react-icons/ci";
import ModalSubmit from "@/app/Shared/Modal/mobal_submit";
import Image from "next/image";
import { authFreshToken } from "@/lib/auth.fetch";
import ModalWaiting from "@/app/Shared/Modal/modal_waiting";

interface NavbarTestProps {
    userAnswers: string[];
    testid?: string;
}

export default function NavbarTestWriting({
    userAnswers,
    testid,
}: NavbarTestProps) {
    const router = useRouter();

    const [showMobalSubmit, setShowMobalSubmit] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // 👉 Thêm state

    const openModalSubmit = () => setShowMobalSubmit(true);
    const closeModalSubmit = () => setShowMobalSubmit(false);

    const handleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen().catch((err) => {
                console.error(`Error attempting to exit full-screen mode: ${err.message}`);
            });
        }
    };

    const onSubmit = async () => {
        setIsSubmitting(true); // 👉 Hiện ModalWaiting

        const completedAt = new Date();

        try {
            const response = await authFreshToken(
                `http://localhost:8080/writing-result/store-result`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        task1Content: userAnswers[0],
                        task2Content: userAnswers[1],
                        userId: localStorage.getItem("userId"),
                        testId: testid,
                        completedAt,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Submission successful:", result);
            router.push("/pages/LibraryTest/Writing");
        } catch (error) {
            console.error("Error submitting answers:", error);
        } finally {
            setIsSubmitting(false); // 👉 Tắt ModalWaiting
        }
    };

    return (
        <>
            <nav className="p-3 text-black font-bold text-lg bg-customWhile1 h-20">
                <NavigationMenu>
                    <div className="flex items-center justify-between mx-auto h-full">
                        <div className="flex items-center space-x-4">
                            <div className="text-white font-bold text-lg">
                                <CiLogout
                                    className="text-3xl text-customeBlack cursor-pointer"
                                    onClick={() => router.push("/pages/LibraryTest/Writing")}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <NavigationMenuList className="flex space-x-4">
                                <div className="flex items-center justify-center gap-6 mr-2">
                                    <Image
                                        src={`/assets/listeningTest/note-svgrepo-com (1).svg`}
                                        alt=""
                                        height={200}
                                        width={20}
                                        className="cursor-pointer"
                                    />
                                    <TfiAlignJustify className="text-2xl text-customeBlack cursor-pointer" />
                                    <TfiFullscreen
                                        className="text-2xl text-customeBlack cursor-pointer"
                                        onClick={handleFullscreen}
                                    />
                                </div>

                                <NavigationMenuItem className="flex items-center">
                                    <Button
                                        className="bg-[#F9A95A] text-white rounded-full px-11 py-6 text-base hover:bg-[#F9A95A]"
                                        onClick={openModalSubmit}
                                    >
                                        Submit
                                    </Button>

                                    {/* Modal Submit */}
                                    {showMobalSubmit && (
                                        <ModalSubmit
                                            invisible={showMobalSubmit}
                                            closeModal={closeModalSubmit}
                                            onSubmit={onSubmit}
                                        />
                                    )}
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </div>
                    </div>
                </NavigationMenu>
            </nav>

            {/* 👉 ModalWaiting hiển thị khi đang gửi bài */}
            <ModalWaiting visible={isSubmitting} message="Đang gửi bài, vui lòng chờ..." />
        </>
    );
}
